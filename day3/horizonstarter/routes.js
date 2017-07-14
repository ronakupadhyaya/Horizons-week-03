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

// all handlebar files are in views directory
// they all end in .hbs (but you can change to something like .may), and you do this in handlebars setup area in app.js


router.get('/', function(req, res) {
  Project.find(function(err, array) {
    // 'index' is the file 'index.hbs' that express finds in views/
    // the second argument is an object, that handlebars can use
    // handlebars can only use the keys in that object
    res.render('index', {items: array})
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  req.check('title', 'title must be specified').notEmpty();
  req.check('goal', 'title must be specified').notEmpty();
  req.check('description', 'title must be specified').notEmpty();
  req.check('start', 'title must be specified').notEmpty();
  req.check('end', 'title must be specified').notEmpty();

  var error = req.validationErrors();
  if (error) {
    res.status(400);
  }
  res.render('new', {
    errors: error
  })
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
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
