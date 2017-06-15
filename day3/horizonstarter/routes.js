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
  Project.find(function(err, projects){
    if(err){
      console.log('Error: ', err);
    }
    else{
      res.render('index.hbs', {items: projects});
    }
  });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new.hbs');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  var proj = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    contributions: [],
    total: 0
  });

  proj.save(function(err){
    if(err){
      console.log('Error: ', err);
    }
    else{
      res.redirect('/');
    }
  })
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, a){
    if(err){
      console.log(err);
    }
    else{
      var complete = a.total/a.goal * 100;
      res.render('project.hbs', {a: a, id: req.params.projectid, complete: complete});
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, a){
    if(err){
      console.log(err);
    }
    else{
      a.total += parseInt(req.body.amount);
      a.contributions.push({name: req.body.name, amount: req.body.amount});
      a.save(function(err){
        if(err){
          console.log(err);
        }
        else{
          var complete = a.total/a.goal * 100;
          res.render('project.hbs', {a: a, id: id, complete: complete});
        }
      });
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
