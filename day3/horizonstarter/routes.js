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

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  // YOUR CODE HERE
  Project.find(function(err, projects){
    res.render('index', {projects: projects});
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('title', 'Please enter a title').notEmpty();
  req.checkBody('goal', 'Please enter a goal').notEmpty().isInt();
  req.checkBody('description', 'Please enter a description').notEmpty();
  req.checkBody('start', 'Please enter a start date').isDate();
  req.checkBody('end', 'Please enter an end date').isDate();
  var errors = req.validationErrors();
  if (errors){
    console.log('fff')
  } else {
    //no errros, create new project
    console.log('ffffdsdf')

    var proj = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });

    proj.save(function(error){
      if (error) {
        console.log('error' + error)

      } else { //redirect to /
        console.log('fgdghfgfe')

        res.redirect('/')
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE

  Project.findById(req.params.projectid, function(err, project){
    if (err) {

    } else {
      req.checkBody('title', 'Please enter a title').notEmpty();
      req.checkBody('goal', 'Please enter a goal').notEmpty().isInt();
      req.checkBody('description', 'Please enter a description').notEmpty();
      req.checkBody('start', 'Please enter a start date').isDate();
      req.checkBody('end', 'Please enter an end date').isDate();
      var errors = req.validationErrors();
      
      // if(errors){
      //   console.log("Error", errors)
      // } else {
      //   var proj = new Project({
      //     title: req.body.title,
      //     goal: req.body.goal,
      //     description: req.body.description,
      //     start: req.body.start,
      //     end: req.body.end
      //   });

        res.render('project', {project: project} );
      // }
    }
  })
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
