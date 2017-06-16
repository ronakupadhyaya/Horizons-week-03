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
  Project.find(function(err, projectsArray) {
    res.render('index', {
      items: projectsArray
    });
  });
});

// Part 2: Create project
// Implement the GET /new endpoint

router.get('/new', function(req, res) {
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint

router.post('/new', function(req, res) {
  if (!(req.body.title) || !(req.body.goal) || !(req.body.description) || !(req.body.start) || !(req.body.end)){
    console.log('here');
    res.render('new', {
      error1: !(req.body.title),
      error2: !(req.body.goal),
      error3: !(req.body.description),
      error4: !(req.body.start),
      error5: !(req.body.end),
      title: req.body.title,
      goal: req.body.goal,
      desc: req.body.description,
      start: req.body.start,
      end: req.body.end
    })
  }
  else {
    console.log(req.body.description)
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    })
    project.save(function(err, p) {
      res.redirect('/');
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint

router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function (err, proj) {
    if (proj.contributions === []) {
      res.render("project", {
        project: proj,
        projectPercent: 0
      })
    }
    else {
      var totalContributions = 0
      for (var i = 0; i < proj.contributions.length; i++) {
        totalContributions += parseFloat(proj.contributions[i].amount)
      };
      var projectGoal = proj.goal
      var projectPercent = (totalContributions/projectGoal) * 100;
      res.render("project", {
        project: proj,
        projectPercent: projectPercent
      })
    }
  });
})

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint

router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function (err, proj) {
    if (proj.contributions === []) {
      res.render("project", {
        project: proj,
        projectPercent: 0
      })
    }
    else {
      var totalContributions = 0
      for (var i = 0; i < proj.contributions.length; i++) {
        totalContributions += parseFloat(proj.contributions[i].amount)
      };
      var projectGoal = proj.goal
      var projectPercent = (totalContributions/projectGoal) * 100;
      proj.contributions.push({name: req.body.name, amount: req.body.amount});
      proj.save(function(err, project){
        if (err) {
          console.log("Error")
        } else {
          res.render("project", {
            project: proj,
            projectPercent: projectPercent,
          })
        }
      });
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function (err, proj) {
    22
    console.log(proj)
    res.render("editProject", {
      project: proj,
    });
  });
});

module.exports = router;
