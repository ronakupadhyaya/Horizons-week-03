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
  Project.find(function(error, array) {
    if (error) {
      console.log("Error: ", error);
    } else {
      res.render('index', {items: array});
    }
  });
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new')
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  req.checkBody('title', 'Invalid title').notEmpty();
  req.checkBody('goal', 'Invalid goal').isInt();
  req.checkBody('description', 'Invalid description').notEmpty();
  req.checkBody('start', 'Invalid start date').notEmpty();
  req.checkBody('end', 'Invalid end date').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    req.body.errors = errors;
    res.render('new', req.body)
  } else {
    req.body.contributions = [];
    var newProject = new Project(req.body);
    newProject.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.redirect("/");
      }
    });
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(error, proj) {
    if (error) {
      res.status(500).json(error);
    } else {
      res.render('project', proj)
    }
  })
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  console.log(req)
  Project.findById(req.params.projectid, function(error, proj) {
    if (error) {
      res.status(500).json(error);
    } else {
      // console.log("THERE",req.body);
      // console.log(req.body.amount);
      proj.contributions.push({name: req.body.name, amount:req.body.amount});
      console.log("HERE", proj);
      proj.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          console.log(proj)
          res.redirect("/project/" + req.params.projectid);
        }
      })
    }
  })
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(error, proj) {
    if (error) {
      res.status(500).json(error);
    } else {
      console.log(proj)
      res.render('editProject', proj);
    }
  })
});

// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  console.log(req.body);
  Project.findByIdAndUpdate(req.params.projectid, {$set: req.body}, function(error, proj) {
      if (error) {
        res.status(500).json(error);
      } else {
        console.log(proj)
        res.redirect("/project/" + req.params.projectid);
      }
  });
});

module.exports = router;
