"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var expressValidator = require('express-validator');

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

// Exercise 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  Project.find(function(err, array) {
    res.render('index', {items: array});
  });
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {})
});

// Exercise 2: Create project
// Implement the POST /new endpoint

function validate(req) {
  req.checkBody('title', 'Please input title').notEmpty();
  req.checkBody('goal', 'Please input goal').notEmpty();
  req.checkBody('start', 'Please input start date').notEmpty();
  req.checkBody('end', 'Please input end date').notEmpty();
}

router.post('/new', function(req, res) {
  validate(req);
  var errors = req.validationErrors();
  if (errors) {
    res.render('new', {errors: errors});
  } else {
    var info = req.body;
    var post = new Project({
      title: info.title,
      description: info.description,
      goal: parseInt(info.goal),
      start: new Date(info.start),
      end: new Date(info.end)
    })
    console.log("fuck me")
    post.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.redirect('/')
      }
    })
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, array) {
    console.log(array)
    if (err) {console.log("you done fucked up")}
    else {
      console.log("i am aray", array)
      array.contributions.push({
        name: req.body.,
        amount: req.body.amount
      })
    }
  });
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, array) {
    console.log(req.body)
    res.render('project', {items: array});
  });
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
