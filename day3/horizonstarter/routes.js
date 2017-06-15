"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

var bodyParser = require('body-parser');

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
  Project.find(function(err, array){
    res.render('index', {items: array});
  });
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
  var newProject = new Project({
    title: req.body.title,
    goal:req.body.goal,
    description:req.body.description,
    start: req.body.start,
    end: req.body.end,
  });
  newProject.save(function(err){
    if (err){
      res.render('new', {
        project:newProject
      })
    }
    else{
      // dont do anything.
      res.redirect('/');
    }
  });
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, project){
    if (err){
      console.log(err);
    }
    else{

      var sum = project.contributions.reduce(function(a,b){
        return a+ b.amount
      },0)
      var percent = sum/project.goal;
      res.render('project', {
        project: project,
        sum : sum,
        percent: percent
      });
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE

  var id = req.params.projectid;

  var newContribution = new Object({
    name: req.body.name,
    amount: req.body.amount
  })

  Project.findById(id, function(err, project){
    if (err){
      console.log(err);
    }
    else{
      project.contributions.push(newContribution);
      project.save(function(err){
        if (err){
          res.render('new', {
            project:project
          })
        }
        else{
          res.redirect('/project/'+id);
        }
      })
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
