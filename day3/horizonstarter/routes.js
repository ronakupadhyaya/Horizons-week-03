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
  Project.find(function(err, project) {
  //  console.log(projects);
    res.render('index', {projects: project});
  });
  // YOUR CODE HERE
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  var categories = ['Famous Muppet Frogs', 'Current Black Presidents', 'The Pen Is Mightier', 'Famous Mothers', 'Drummers Named Ringo', '1-Letter words', 'Months That Start With "Feb"', 'How Many Fingers Am I Holding Up', 'Potent Potables']
  var selected = project.category
  var s = categories.splice(indexOf(selected), 1);
  categories = s.concat(categories);

  res.render('new', {title: "Create Project", arr: categories }
);
  // YOUR CODE HERE
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
    req.checkBody('title', 'Invalid title').notEmpty();
    req.checkBody('goal', 'Invalid goal').notEmpty();
    req.checkBody('description', 'Invalid goal').notEmpty();
    req.checkBody('start', 'Invalid start date').notEmpty();
    req.checkBody('end', 'Invalid end date').notEmpty();
    var err = req.validationErrors();
    if(err){
      res.render('/new', {errors: err, project: req.body});
    }
    else {
      var newProject = new Project({
        title: req.body.title,
        description: req.body.description,
        goal: req.body.goal,
        start: req.body.start,
        end: req.body.end
      });
      newProject.save(function(err){
        if (err){
          console.log("error", err)
        }
        res.redirect('/')
      })
    }

  // YOUR CODE HERE
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project){
    project.total = 0;
    project.contributions.forEach(function(obj){
    project.total += obj.amount;
    });
    project.percent = (project.total/project.goal)*100;
    if(err){
      console.log("error", err);
    }else{
    res.render('project', project);
  }
  });

  // YOUR CODE HERE
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    req.checkBody('name', 'Contributor name').notEmpty();
    req.checkBody('amount', 'Contributor amount').notEmpty().isInt();
    var errors = req.validationErrors();
    project.contributions.push(req.body);
    project.save(function(err){
      if (err){
        console.log(err);
      }
      else {
        res.redirect('/project/' + req.params.projectid)
      }
    });
  });
});


// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.get('/projects/:projectid/edit', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project){
    if(err){
      console.log('error', err);
    }else{
      var categories = ['Famous Muppet Frogs', 'Current Black Presidents', 'The Pen Is Mightier', 'Famous Mothers', 'Drummers Named Ringo', '1-Letter words', 'Months That Start With "Feb"', 'How Many Fingers Am I Holding Up', 'Potent Potables']
      var selected = project.category;
      var s = categories.splice(categories.indexOf(selected), 1);
      categories = s.concat(categories);
    res.render('editProject', {project: project, arr: categories, startDate: project.start, endDate: project.end});
  }
  });

  // YOUR CODE HERE
});


router.post('/projects/:projectid/edit', function(req, res) {
  Project.findByIdAndUpdate(req.params.projectid, function(err, project) {
    req.checkBody('name', 'Contributor name').notEmpty();
    req.checkBody('amount', 'Contributor amount').notEmpty().isInt();
    var errors = req.validationErrors();
    project.contributions.push(req.body);
    project.save(function(err){
      if (err){
        console.log(err);
      }
      else {
        res.redirect('/editProject/' + req.params.projectid)
      }
    });
  });
});
router.get('/:sort/:sortDirection', function(req, res){
  Project.find({}).sort({req.params.sort: req.params.sortDirection}).exec(function(err, docs) {
        res.render('index', {projects: project});
   });
});
module.exports = router;
