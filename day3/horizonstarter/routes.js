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
  Project.find(function(err, array) {
    if(err) {
      console.log('Error')
    } else {
      res.render('index', {items: array})
    }
  })
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new');
});

// Exercise 2: Create project
// Implement the POST /new endpoint
var expressValidator = require('express-validator');
router.use(expressValidator());

function validate(req) {
  req.checkBody('title', 'No Title').notEmpty();
  req.checkBody('goal', 'No Goal').isInt();
  req.checkBody('start', 'Invalid Start Date').notEmpty();
  req.checkBody('end', 'Invalid End Date').notEmpty();
}

router.post('/new', function(req, res) {
  validate(req)
  var errors = req.validationErrors();
  if(errors) {
    req.body.errors = errors
    res.render('new', req.body)
  } else {
    var newproj = new Project(req.body);
    newproj.save(function(err){
      if(err){
        console.log(err)
      } else{
        res.redirect('/')
      }
    })
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    project.total = 0;
    project.contributions.forEach(function(obj) {
      project.total += obj.amount;
    });
    project.percent = (project.total/project.goal)*100;
    console.log(project)
    res.render('project', project)
  })
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    project.contributions.push(req.body)
    project.save(function(err) {
      if(err){
        console.log('Error')
      } else {
        res.redirect('/project/' + req.params.projectid)
        }
      }
    )
})
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
