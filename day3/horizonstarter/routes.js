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
  Project.find(function(err, project) {
    if (err) res.send(err);
    res.render('index', {project: project, title: "horizon Starter"});
 });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new', {
    title: "New Project"
  });
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  req.checkBody('category', 'Category is required').notEmpty();
  req.checkBody('amount', 'Amount is required').notEmpty();
  req.checkBody('amount', 'Amount must be an integer').isInt();
  req.checkBody('start', 'Start date is required').notEmpty();
  req.checkBody('start', 'Start date must be a date').isDate();
  req.checkBody('end', 'End date is required').notEmpty();
  req.checkBody('end', 'End date must be a date').isDate();
  var errors = req.validationErrors();
  console.log(errors);
  console.log("Body: " + JSON.stringify(req.body));
  // YOUR CODE HERE
  var post = new Project ({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    });
    post.save(function(err){
      if (err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        res.redirect('/')
      }
    });
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function (err, project){
    var sum = 0;
    for (var i = 0; i < project.contributions.length; i++) {
      sum = sum + parseInt(project.contributions[i].amount);
    }
    var percent = (sum / project.goal)*100;
    if (err) res.send(err);
    res.render("project", {project: project, sum: sum, percent: percent});
  });
});

// Part 4: Contribute to a project
// Implement the POST /project/:projectid endpoint in week03/day3/horizonstarter/routes.js.
// This endpoint should find the Project from MongoDb with .findById(),
// add a new object to the contributions array and .save() it back.
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
//   Project.findByIdAndUpdate(req.params.projectid, {name: req.body.name, amount: req.body.amount}, function (err, project) {
//   if (err) return handleError(err);
//   res.send(project);
// });
  Project.findById(req.params.projectid, function(err, project) {
    // if (err) res.send(err);
    // req.checkBody('name', 'Name is required').notEmpty();
    // req.checkBody('amount', 'Amount is required').notEmpty();
    // req.checkBody('amount', 'Amount must be an integer').isInt();
    // var errors = req.validationErrors();
    // if (err) {
    //   console.error(errors);
    // } else {
      project.contributions.push({
        name: req.body.name,
        amount: req.body.amount
      });
      project.save(function(err) {
        console.error(err);
        res.redirect('/project/' + req.params.projectid)
    })
  });
})

router.get ('/projects/:projectid/edit', function(req, res){
  project.findById(req.params.projectid, function(err, project){
    res.render('editProject', {project: project})
  })
})

router.post('/projects/:projectid/edit', function(req, res){
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    project: req.body
  }, function(err) {
    // YOUR CODE HERE
  });
});
// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
