"use strict";

// Backend routes go here, with inline controllers for each route.

var express = require('express');
var validator = require('express-validator');
var router = express.Router();
var Project = require('../model/project');
var strftime = require('strftime');

// GET home page: list of all projects
router.get('/', function(req, res) {
  Project.find(function(err, projects) {
    if (err) res.send(err);
    var flash;
    if (req.session.flash)
      flash = req.session.flash.shift();
    res.render('index', {projects: projects, title: "Horizon Starter", flash: flash});
  });
});

// GET new project form
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
      goal: req.body.amount,
      category: req.body.category,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
    project.save(function(err) {
      if (err) {
        console.error(err);
        res.render('new', {
          data: req.body,
          categories: Project.schema.path('category').enumValues.map(function (el) {
            // This is messy, but we can't have logic in handlebars.
            return {val: el, selected: el===req.body.category};
          }),
          flash: { type: 'alert-danger', messages: [{msg: err.message}]}
        });
      }
      else {
        // Set success flash message and redirect.
        req.session.flash = [{
          type: 'alert-success',
          messages: [{msg: "Project created successfully"}]
        }];
        res.redirect('/');
      }
    });
  }
});

// GET a project
router.get('/project/:projectId', function(req, res) {
  Project.findById(req.params.projectId, function(err, project) {
    if (err) res.send(err);
    if (!project) res.status(404).send(err);
    res.render('project', {
      project: project,
      // format the times separately
      start: strftime('%B %d, %Y', project.start),
      end: strftime('%B %d, %Y', project.end)
    });
  });
});

// POST to a project (make a contribution)
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    if (err) res.send(err);

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('amount', 'Amount is required').notEmpty();
    req.checkBody('amount', 'Amount must be an integer').isInt();
    var errors = req.validationErrors();
    if (errors) {
      console.error(errors);
      res.render('project', {
        project: project,
        // format the times separately
        start: strftime('%B %d, %Y', project.start),
        end: strftime('%B %d, %Y', project.end),
        data: req.body,
        flash: { type: 'alert-danger', messages: errors}
      });
    }
    else {
      project.contributions.push({
        name: req.body.name,
        comment: req.body.comment,
        amount: req.body.amount
      });
      project.save(function(err) {
        console.error(err);
        var flash = err ?
          {type: 'alert-danger', messages: [{msg: err.message}]} :
          {type: 'alert-success', messages: [{msg: "Thanks for your contribution!"}]};
        res.render('project', {
          project: project,
          // format the times separately
          start: strftime('%B %d, %Y', project.start),
          end: strftime('%B %d, %Y', project.end),
          data: req.body,
          flash: flash
        });
      })
    }
  });
});

//////////////////////////////////////////////////////////////////////////////
////////////////////////////API ROUTES////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// All projects (with filter).
router.post('/api/:project', function(req, res) {
  Project.find(function(err, projects) {
    if (err) {
      res.status(500).json(err);
      return;
    }

    // This query param is a bool so be careful how we read it!
    if (req.query.hasOwnProperty('funded')) {
      console.log("Got funded query");
      var filter;
      // Parse JSON so "0" string isn't truthy.
      var funded = JSON.parse(req.query.funded);
      if (funded) {
        console.log("Filtering on projects that are FUNDED");
        filter = function (el) { return el.funded };
      }
      else {
        console.log("Filtering on projects that are NOT FUNDED");
        filter = function (el) { return !el.funded };
      }
      projects = projects.filter(filter);
    }

    if (req.query.goalAbove) {
      req.checkQuery('goalAbove', 'Invalid goalAbove').isInt();
      var errors = req.validationErrors();
      if (errors) {
        // In a production app we may not want to return the raw errors here
        // since it can be a bit dangerous!
        res.status(400).json(errors);
        return;
      }
      var goalAbove = req.query.goalAbove;
      projects = projects.filter(function (el) { return el.goal >= goalAbove});
    }

    res.status(200).json(projects);
  });
});

// Project contributions.
// Chain our routes (since we handle multiple request types). Nifty!
router.get('/api/project/:projectId/contribution', function(req, res) {
    // Look up the project.
    Project.findById(req.params.projectId, function (err, project) {
      // The project ID doesn't exist.
      if (err) {
        res.status(404).json(err);
        return;
      }
      res.status(200).json(project.contributions);
    });
  });

router.post('/api/project/:projectId/contribution', function(req, res) {

    Project.findById(req.params.projectId, function (err, project) {
      if (err) {
        res.status(404).json(err);
        return;
      }
      req.checkBody('name', 'Name is required').notEmpty();
      req.checkBody('amount', 'Amount is required').notEmpty();
      req.checkBody('amount', 'Amount must be an integer').isInt();
      var errors = req.validationErrors();
      if (errors) {
        res.status(400).json(errors);
        return;
      }
      var newContribution = {
        name: req.body.name,
        comment: req.body.comment,
        amount: req.body.amount
      };
      project.contributions.push(newContribution);
      project.save(function(err) {
        console.error(err);
        if (err) {
          res.status(400).json(err);
          return;
        }
        res.status(201).json(newContribution);
      });
    });
  });

module.exports = router;
