"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Implement the GET / endpoint.
router.get('/', function(req, res) {
  Project.find(function(err, array) {
    res.render('index', {
      projects: array
    })
  })
});

// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  var categories = Project.schema.path('category').enumValues;
  res.render('new', {
    categories: categories
  })
});

// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  //check POST body contents
  req.check('title', 'no title').notEmpty()
  req.check('goal', 'no goal').notEmpty()
  req.check('start', 'no start date').notEmpty()
  req.check('end', 'no end date').notEmpty()

  //re-render if errors
  var errors = req.validationErrors();
  if (errors) {
    console.log("A user didn't fill the inputs");
    res.render('new', {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      categories: Project.schema.path('category').enumValues,
      error: true
    })
  } else {
    //save new project and go back to main page
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category

    })
    project.save(function(err) {
      console.log("Saved project: ", project.title);
      if (err) {
        console.log("Error saving project");
      }
      res.redirect('..')
    })
  }
});

// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    res.render('project', {
      project: found
    })
  })
})

// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.error(err);
    }
    found.contributions.push({name:req.body.name,amount:req.body.amount})
    found.save(function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect('#')
    })
  })
});

// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log(err);
    }
    res.render('editProject', {
      title: found.title,
      goal: found.goal,
      description: found.description,
      start: found.start,
      end: found.end,
      categories: Project.schema.path('category').enumValues,
      error: !!err
    })
  })
})

// Create the POST /project/:projectid/edit endpoint
router.post('project/:projectid/edit', function(req, res) {
  
})


module.exports = router;
