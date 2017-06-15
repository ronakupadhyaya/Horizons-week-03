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
  // YOUR CODE HERE
  Project.find(function(error, projects) {
    if (error) {
      console.log("Cant find any projects", error);
    } else {
      res.render('index', {
        Project: projects
      });
    }
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
  var p = {
      title: req.body.title,
      goal:req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
  }
  if (!p.title || !p.goal || !p.start || !p.end) {
    res.render('new', {
      p: p,
      error: "something is wrong lol"
  });
  } else {
  var newProject = new Project(p)
  newProject.save( function () {
    res.redirect('/');
  });

  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(error, project) {
    if (error) {
      console.log('Error', error);
    } else {
      res.render('project', {
        Project: project
      })
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(error, project) {
    if (error) {
      res.send(error);
    } else {
      console.log(req.body.name, req.body.amount)
      if (req.body.name !== " " && !isNaN(req.body.amount)) {
        var newObj = {name: req.body.name, amount: parseInt(req.body.amount)};
        console.log(project.contributions);
        var c = project.contributions || [];
        c.push(newObj); //project.contributions.push(newObj)
        project.contributions = c;
        project.save({contributions: project.contributions}, function(error, savedObject) {
          console.log(savedObject);
          res.redirect('/project/'+id)
        })
      }
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
