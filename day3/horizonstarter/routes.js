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
  Project.find(function(err, array){
    res.render('index', {projectsArr: array})
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  var newProj = new Project({
    title:req.body.title,
    goal:req.body.goal,
    description:req.body.description,
    start:req.body.start,
    end:req.body.end
  })
  newProj.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.redirect('/');
    }
  })

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projId = req.params.projectid;
  var findProj = Project.findById(projId, function (err, arr) {
      res.render('project', arr)
  });

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projId = req.params.projectid;
  var findProj = Project.findById(projId, function (err, arr) {
    var contObj = {
      name: req.body.name,
      amount: req.body.name
    }
    res.render('project/:projectid', arr.contributions.push(contObj))
      console.log(contObj);
  });

  // findProj.contributions.push(contObj);
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
