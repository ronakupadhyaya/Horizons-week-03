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
  Project.find(function(err, projectArray){
    res.render('index', {projects: projectArray})
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
  console.log("req body", req.body);
  var newProject = new Project(req.body);

  newProject.save(function(err, result){
    if(err){
      console.log("ERR", err);
      res.render('new', {project: req.body});
    } else{
      console.log("WHAT");
      res.redirect('/');
    }
  })
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projectId = req.params.projectid;

  Project.findById(projectId, function(err, project){
    var total = 0;

    for(var i=0; i < project.contributions.length;i++){
      total += project.contributions[i].amount;
    }
    var percentage = total/project.goal * 100;
    res.render('project', {project: project, total: total, percentage: percentage});
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var projectId = req.params.projectid;
  console.log("REQ body", req.body);
  Project.findById(projectId, function(err, project){
    if(err){
      console.log("Err", err);
    } else{
      project.contributions.push(req.body);
      project.save(function(err, project){
        if(err){
          console.log("Err2", err);
        } else{
          res.redirect('/project/' + project.id);
        }
      })
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
