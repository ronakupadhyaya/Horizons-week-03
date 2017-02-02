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
  // YOUR CODE HERE
  Project.find(function (err, project){

    res.render('index', {projects: project} )
  })
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {title: "Create Project"})
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('title', 'Invalid title').notEmpty();
  req.checkBody('goal', 'Invalid title').notEmpty().isInt();
  req.checkBody('description', 'Invalid title').notEmpty();
  req.checkBody('start', 'Invalid title').notEmpty();
  req.checkBody('end', 'Invalid title').notEmpty();
  var err = req.validationErrors();
  if(err) {
    res.render('new', {errors: err, project: req.body})
  }
  else {
    var newProject = new Project(req.body);
    console.log(req.body)
    newProject.save(function(err){
      if(err){
        console.log("error", err)
      }
      res.redirect('/');
    });
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function (err, project) {
    if (err) {
      console.log("error", err)
    }
    else {
      res.render('project', {project: project})
      console.log(project)
    }
  })
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project) {
    if(err) {
      console.log(err);
    }
    else {
      project.contributions.push({name: req.body.name, amount: req.body.amount});
      project.save(function(err, project) {
        if(err) {
          console.log('bs')
        } else {
          res.render('project', {
            project:project
          })
        }
      });
    }
  })

});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
