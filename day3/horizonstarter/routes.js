"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var validator = require('express-validator');

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
  Project.find(function(err, projectArr) {
    res.render('index', {items:projectArr});
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
  // var error = validator(req);
  var title = req.body.title;
  var goal = parseInt(req.body.goal);
  var description = req.body.description;
  var start = req.body.start;
  var end = req.body.end;

  if(!title || !goal || !start || !end){
    res.render("new", {
      title: title || "Title required",
      goal: goal || "Goal required",
      description: description
    });
  }

  else{
    console.log("success");
    var newProject = new Project({
      title: title,
      goal: goal,
      description: description,
      start: new Date(start),
      end: new Date(end)
    });

    newProject.save(function(error){
      if(!error) {
        res.redirect('/');
      }
      // mongoose.close.connection();
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projectid = req.params.projectid;

  Project.findById(projectid, function(err, foundProject){
    if(err) {
      console.log("There was an error finding the ID. Please try again")
    }
    else{
      var total = 0;

      var contributionArr = foundProject.contributions;

      contributionArr.forEach(function(item) {
        total += item.amount;
      });

      var percentage = total / foundProject.goal * 100;

      res.render('project', {
        project: foundProject,
        percentage: percentage,
        total: total
      });
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projectid = req.params.projectid;

  Project.findById(projectid, function(err, foundProject){
    if(err) {
      console.log("Contribution error");
    }
    else{
      foundProject.contributions.push({name: req.body.name, amount: parseFloat(req.body.amount)});
      foundProject.save(function(error){
        if (error) {
          console.log("error making contribution");
        }
        else{
          var total = 0;

          var contributionArr = foundProject.contributions;

          contributionArr.forEach(function(item) {
            total += item.amount;
          });

          var percentage = total / foundProject.goal * 100;

          res.render('project', {
            project: foundProject,
            percentage: percentage,
            total: total
          });

        }
      });
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
