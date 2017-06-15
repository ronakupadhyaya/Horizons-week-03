"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var app = express();
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

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
  Project.find(function(error, projects) {
    res.render('index', {projects:projects});
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
  if (req.validationErrors()) {
    res.render('new')
  } else {
    var newProject = new Project({title: req.body.title, goal: req.body.goal, description: req.body.textarea, start: req.body.start, end: req.body.end});
    newProject.save(function(error,project) {
      if (error) {
        console.log("you messed up");
      } else {
        res.redirect('/');
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(error, project) {
    if (error) {
      console.log("No single project could be found.")
    } else {
      var projectTotal = 0;
      project.contributions.forEach(function(ele) {
        projectTotal += ele.amount;
      })
      var projectPercent = parseInt(projectTotal/project.goal*100, 10);
      var projectWidth = projectPercent > 100 ? 100 : projectPercent;
      res.render('project', {project: project, total: projectTotal, width: projectWidth, contributors: project.contributions, percent: projectPercent});
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var contribution = {name: req.body.name, amount: req.body.contribution};
  Project.findById(req.params.projectid, function(error, project) {
    if (error) {
      console.log("No single project could be found.")
    } else {
      project.contributions.push(contribution);
      project.save();
      res.redirect('/project/' + req.params.projectid);
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
