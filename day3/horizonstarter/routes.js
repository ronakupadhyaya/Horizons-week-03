"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Enable form validation with express validator.
var expressValidator = require('express-validator');
router.use(expressValidator());

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
  // YOUR CODE HERE
  Project.find(function(error, projects) {
    if (error) {
      res.status(500).json(error)
    } else {
      console.log(projects)
      res.render('index', {
        projects: projects
      })
    }
  });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  console.log('***********************')
  console.log(req.validationErrors())
  if (req.validationErrors()) {

    console.log('there are validation errors')
    var projectObj = {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      error: "Please fill out all fields"
    }
    res.render('new', {
      project: projectObj
    })
  } else {
    new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      contributions: []
    }).save(function(err) {
      if (err) {
        var projectObj = {
          title: req.body.title,
          goal: req.body.goal,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
          error: "Please fill out all fields"
        }
        res.render('new', {
          project: projectObj
        })
        console.log('ERROR', err)
      } else {
        console.log('SAVED!')
        res.redirect('/')
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  console.log("mama")
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err, project) {
    if (err) {
      console.log("This isn't the project you're looking for")
    } else {
      res.render('project', {
        project: project,
        projectid: projectid
      })
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var name = req.body.name;
  var amount = req.body.amount;
  var projectid = req.params.projectid;
  Project.findOneAndUpdate(projectid, {$push: {contributions: {name: name, amount: amount}}}, function (err) {
    if (err) {
      console.log('uh nuh')
    } else {
      console.log('it worked')
      res.render('project')

    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
