"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({title: 'I am a test project'});
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
  Project.find(function(error, projects) {
    if (error) {
      console.log(error);
    } else {
      console.log('There are some! :) ');
      res.render('index', {projects: projects})
    }
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
  if (req.body.title === '' || req.body.goal === '' || req.body.desc === '') {
    res.render('new', {error: 'ERROR!'})
  } else {
    var project = new Project({title: req.body.title, goal: req.body.goal, description: req.body.desc, start: req.body.start, end: req.body.end, totalContributions: 0})
    project.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        Project.find(function(error, projects) {
          if (error) {
            console.log(error);
          } else {
            console.log('There are some! :) ');
            res.render('index', {projects: projects})
          }
        })
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projectid = req.params.projectid;
  Project.findById(projectid, function(error, project) {
    if (error) {
      console.log(error);
    } else {
      console.log('There are some! :) ');
      res.render('project', {project: project})
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var projectid = req.params.projectid;
  Project.findById(projectid, function(error, project) {
    if (error) {
      console.log(error);
    } else {
      console.log('There are some! :) ');
      if (req.body.name === '' || req.body.amount === '') {
        console.log('ERROR');
      } else {
        project.contributions.push({name: req.body.name, amount: req.body.amount})
        project.totalContributions += req.body.amount;
        project.save(function(err) {
          if (err) {
            res.status(500).json(err);
          } else {
            var url = "project/" + project._id;
            console.log(project.totalContributions);
            console.log(project.goal);
            var goalPercent = (project.totalContributions / project.goal) * 100;
            console.log(goalPercent);
            var width = `width:${goalPercent}%`;
            console.log(width);
            res.render('contributions', {project: project, goalPercent: goalPercent, width: width});
          }
        })
      }
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
