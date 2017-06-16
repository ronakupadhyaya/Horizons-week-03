"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({
    title: 'I am a test project'
  });
  project.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send('Success: created a Project object in MongoDb');
    }
  });
});

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  Project.find(function(err, array) {
  res.render('index', {items: array});
});
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  req.checkBody('title', 'Must have title').notEmpty()
  req.checkBody('goal', 'Must have goal').notEmpty().isInt()
  req.checkBody('description', 'Must have description').notEmpty()
  req.checkBody('start', 'Must have start date').notEmpty()
  req.checkBody('end', 'Must have end date').notEmpty()
  var error = req.validationErrors();
  if (error) {
    res.render('new', {
      error: error
    });
  }
  else {
    var newProject = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    })
    newProject.save(function(err, proj) {
      if(err) {
        console.log('Error: ',err)
      }
      else {
        res.redirect('/');
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectId, function(err, proj) {
    if(err) {
      console.log('Error', err)
    }
    else {
      res.render('project', {
        title: proj.title,
        goal: proj.goal,
        description: proj.description,
        start: proj.start,
        end: proj.end
      })
    }
  })
  });


});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
