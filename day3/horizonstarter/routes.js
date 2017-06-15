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
    res.render("index", {
      projects: projects
    });
  });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render("new", {})
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('goal', 'Goal is required').notEmpty();
  req.checkBody('goal', 'Goal must be a valid number').isInt();
  req.checkBody('start', 'Start date is required').notEmpty();
  req.checkBody('end', 'End date is required').notEmpty();
  console.log(req.validationErrors());
  if (req.validationErrors()) {
    res.render("new", {
      errors: req.validationErrors(),
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
  } else {
    var new_project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
    new_project.save(function(err, new_proj) {
      console.log(err);
      if (!err) {
        res.redirect("/");
      } else {
        console.log("Error saving project...")
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, proj) {
    if (!err) {
      var total = proj.contributions.map(p => p.amount).reduce((a,b) => a + b, 0);
      res.render("project", {
        project: proj,
        totalContributions: total,
        percentReached: total/proj.goal*100
      })
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, proj) {
    if (!err) {
      proj.contributions.push({
        name: req.body.name,
        amount: req.body.amount
      });
      proj.save(function(err, proj) {
        if (!err) {
          res.redirect(req.get('referer'));
        } else {
          console.log("Error connecting to server...", err);
        }
      });

    } else {
      console.log("Error connecting to server...");
    }

  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
