"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({
    title: 'I am a test project',
    goal: Project.goal,
    description: Project.description

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
  // YOUR CODE HERE
  Project.find(function(err, projects) {
    var array = [];
    // console.log(projects);
    for (var i = 0; i < projects.length; i++){
      array.push(projects[i])
    }
    console.log(req.params);
    res.render('index', {array});
    // console.log(array);
  });
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new');
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  var project = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: new Date(),
    end: (req.body.end),

  });

  project.save(function(error){
    if (error) {
      console.log(error)
    } else {
      res.redirect('/');
    }
  });
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  // res.send(project.contributions)
  var id = req.params.projectid;
  console.log('*****' + Project+'*****')
  Project.findById(id, function(error, project) {
    if (error) {
      res.send(error);
    }
  console.log(project);
    project.save(function(error, task){
      if (error){
        return error;
        res.redirect('/');
      }
    });
    var total = 0
    project.contributions.forEach(function(key){
      var num = parseInt(key.amount);
      total += num;
    })
    console.log(project)
    res.render('project', {project:project, total: total})
  });

});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(error, project) {
    if (error) {
      res.send(error);
    }
    var contribution = {
      name: req.body.name,
      comment: req.body.comment,
      amount: req.body.amount
    }

    project.contributions.push(contribution);
    var total = 0;
    project.contributions.forEach(function(key){
      var num = parseInt(key.amount);
      total += num;
    })
    project.save(function(error, task){
      if (error){
        return error;
        res.redirect('/');
      }
    });
    console.log(total);
    res.render('project', {project:project, total: total})
    // console.log(array);
  });

});


// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  // console.log('query' + req.query);
  // console.log('body' + req.body.projectid)
  // console.log(req);
  var id = req.params.projectid;
  Project.findById(id, function(error, project) {
    if (error) {
      res.send(error);
      res.redirect('/')
    }
      var date = project.end;
      date = date.toString().substring(0,10);
      console.log(date)
      console.log('*****' + project+'*****')
      res.render('editProject', {
      project: project,
      date: date
    })
  });
  // res.redirect('/')
  // res.render('editProject', project)

});
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
