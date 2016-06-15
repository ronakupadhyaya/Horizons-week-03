"use strict";

var express = require('express');
var validator = require('express-validator');
var router = express.Router();
var Project = require('../model/project');
var strftime = require('strftime');

/* GET home page. */
router.get('/', function(req, res) {
  console.log("GET flash is: " + JSON.stringify(req.session.flash));
  Project.find(function(err, projects) {
    if (err) res.send(err);
    var flash;
    if (req.session.flash)
      flash = req.session.flash.shift();
    res.render('index', {projects: projects, title: "Horizon Starter", flash: flash});
  });
});

// GET New project form
router.get('/new', function(req, res) {
  res.render('new', {
    title: "Create new project",
    categories: Project.schema.path('category').enumValues.map(function (el) {
      return {val: el}
    })
  });
});

// POST new project
router.post('/new', function(req, res) {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  req.checkBody('category', 'Category is required').notEmpty();
  req.checkBody('amount', 'Amount is required').notEmpty();
  req.checkBody('amount', 'Amount must be an integer').isInt();
  req.checkBody('start', 'Start date is required').notEmpty();
  req.checkBody('start', 'Start date must be a date').isDate();
  req.checkBody('end', 'End date is required').notEmpty();
  req.checkBody('end', 'End date must be a date').isDate();
  var errors = req.validationErrors();
  console.log(errors);
  console.log("Body: " + JSON.stringify(req.body));
  if (errors) {
    res.render('new', {
      data: req.body,
      categories: Project.schema.path('category').enumValues.map(function (el) {
        // This is messy, but we can't have logic in handlebars.
        return {val: el, selected: el===req.body.category};
      }),
      flash: { type: 'alert-danger', messages: errors}
    });
  }
  else {
    // Create new project
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      raised: 0,
      category: req.body.category,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
    project.save(function(err) {
      if (err) res.send(err);
      // Set success flash message and redirect.
      req.session.flash = [{type: 'alert-success', messages: [{msg: "Project created successfully"}]}];
      console.log("SET flash is: " + JSON.stringify(req.session.flash));
      res.redirect('/');
    });
  }
});

// GET a project
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    if (err) res.send(err);
    res.render('project', {
      project: project,
      // format the times separately
      start: strftime('%B %d, %Y', project.start),
      end: strftime('%B %d, %Y', project.end)
    });
  });
});

module.exports = router;
