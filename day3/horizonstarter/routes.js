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
    res.render('index', {
      array: array
    })
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {});
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  if (!req.body.titleTextBox || !req.body.goalTextBox ||
    !req.body.startDateTextBox || !req.body.endDateTextBox) {
    res.status(400).json('Error 400: one of the inputs is invalid');
  } else {
    var proj = new Project({
      title: req.body.titleTextBox,
      goal: req.body.goalTextBox,
      body: req.body.goalTextBox,
      description: req.body.descTextBox,
      start: req.body.startDateTextBox,
      end: req.body.endDateTextBox,
      totalContributions: 0,
    });
    proj.save(function(err, array) {
      if (err) {
        console.log('The project did not save', err);
      } else {
        res.redirect('/');
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    if (err) {
      console.log("Couldn't find id", err);
    } else {
      res.render('project', {
        project: project,
        goalPercent: goalPercent
      })
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    var con = {
      name: req.body.nameTB,
      amount: req.body.amtTB
    };
    project.totalContributions += parseInt(req.body.amtTB)
    project.contributions.push(con);
    var goalPercent = (project.totalContributions / project.goal) * 100


    project.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      };
    })
  })

});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
