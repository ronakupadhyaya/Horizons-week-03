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

  if (req.query.sort) {
    var sortObject = {};
    var sortDirection = req.query.sortDirection || "ascending"
    sortObject[req.query.sort] = sortDirection;
    Project.find().sort(sortObject).exec(function(err, array) {
      res.render('index', {items: array});
    });
  } else{
    Project.find(function(err, array){
      res.render('index', {items: array});
    });
  }
  //   Project.find(function(err, array) {
  //   res.render('index', {items: array});
  // });
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
  console.log(req.body);
  var project = {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    contributions: req.body.contributions,
    category: req.body.category
  };
  if(req.body.title && req.body.goal && req.body.description && req.body.start && req.body.end){
    new Project(project).save(function(err) {
      if (err) {
        res.send("There's an error. Oh no!" + err);

      } else {
        res.redirect('/');
      }
    });
  }
  else{res.render("new", {
    error: "empty input somewhere",
    project: project //giving handlebar the project
  });
}
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;

  Project.findById(id, function(err, project){
    var sum = project.contributions.reduce(function(a,b){
      return a+parseInt(b.amount);
    }, 0);
    if(err){
      res.send("there's an error");
    }
    else{

      res.render("project", {
        project: project,
        sum: sum
      });
    }
  })

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint

router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, project){
    var sum = project.contributions.reduce(function(a,b){
      return a+parseInt(b.amount);
    }, 0);
    if(err){
      res.send("there's an error");
    }
    else{
      project.contributions.push({name: req.body.name, amount: req.body.amount});
      project.save(function(err, savedProject){
        res.render("project",{
          project: project,
          contribution: sum
        });
      });
    }
  })

});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project){
    if(err){
      console.log(err);
    }
    else {
      res.render('editproject', {
        id: req.params.projectid,
        project: project
      })
    }
  });
});
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  console.log(req.body.end);
  Project.findByIdAndUpdate(req.params.projectId, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    contributions: req.body.contributions,
    category: req.body.category
  }, function(err) {
    console.log('error is ', err);
    res.redirect('/');
  });
});
//AJAX
router.post('/api/project/:projectId/contribution', function(req, res) {

  Project.findById(req.params.projectId, function(err, project) {
    console.log(req.params.projectId);
    if(err){
      console.log('error is ', err);
    } else {
      console.log(project);
      project.contributions.push({name: req.body.name, amount: req.body.amount});
      project.save(function(err, project){
        res.json(project.contribution);
      });
    }
  });
});


module.exports = router;
