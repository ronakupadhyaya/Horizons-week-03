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
  Project.find(function(err, projects) {
    res.render('index', {
      projects: projects
    });
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
  // YOUR CODE HERE
  console.log(req.body.title);
  var newProj = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end
  });
  newProj.save(function(err, project) {
    if(err) {
      res.redirect('/');
    }
    else{
      res.redirect('/');
    }
  });
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, proj) {
    var sum;
    if (!proj.contributions) {
      sum = 0;
    }
    else {
      sum = proj.contributions.reduce(function(a, b) {
              return parseInt(a.amount) + parseInt(b.amount);
            });
    }
    res.render('project', {
      project: proj,
      totalContributions: sum
    })
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  console.log("THE ID IS:" + req.params.projectid);
  /*Project.findById(id, function(err, proj) {
    if (err) {
      console.log(err)
    }
    console.log(proj);
    proj[0].contributions.push({
      name: req.body.name,
      amount: req.body.amount
    });
    console.log("FIRST CHECK:", proj.contributions);
    proj.save(function (err) {
      if (err) {
        res.redirect('/');
      }
      else {
        res.redirect('/');
      }
    });
    console.log("SECOND CHECK", proj.contributions);
  });
  */
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
