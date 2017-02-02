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

// Exercise 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  Project.find(function(err, array) {
    res.render('index', {items: array});
  })
});

// app.get('/:name/:num', function(req, res) {
//   var myName = req.params.name;
//   var myNum = req.params.num;
//   var arr = [];
//   for (var i=0; i<myNum; i++) {
//     arr.push(myName)
//   }
//   res.render('myView', {name: myName, num: myNum})
// })
// app.listen(3000);

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  Project.find(function(err, array) {
    res.render('new', {})
  })
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
