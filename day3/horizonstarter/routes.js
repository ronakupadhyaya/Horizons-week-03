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
  // YOUR CODE HERE
  Project.find(function(err, arr){
    if(err){
      console.log('Error', err);
    }
    res.render('index', {items: arr});
  });
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new');
  console.log('Successful Render')
});

// Exercise 2: Create project
// Implement the POST /new endpoint
function validate(req){
  req.checkBody('title', 'Invalid title').notEmpty();
  req.checkBody('goal', 'Invalid goal').notEmpty();
  req.checkBody('start', 'Invalid start').notEmpty();
  req.checkBody('end', 'Invalid end').notEmpty();
}
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  validate(req);
  var errors =  req.validationErrors();
  if(errors){
    res.render('new', {errors: errors})
  }
   var newProject = new Project({
     title:req.body.title,
     goal: req.body.goal,
     description: req.body.description,
     start: req.body.start,
     end: req.body.end,
   })
   newProject.save(function(err){
     if(err){
       console.log('Error',err);
     } else res.redirect('/')
   })
 });

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res){
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, doc){
    if(err){
      console.log('Error', err);
    } else{
      res.render('project', {project: doc});
    }
  });
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, doc){
    if(err){
      console.log('Error', err);
    } else{
      var newContribution = {
        name : req.body.name,
        amount : req.body.amount
      }
      doc.contributions.push(newContribution);
      doc.save(function(err){
        if(err){
          console.log('Error',err);
        }
        var total = 0;
        doc.contributions.forEach(function(item){
          total += item.amount;
        })
        var percent = total/doc.goal*100
        if(percent> 100){
          percent = 100;
        }
        res.render('project', {project: doc, total: total, percent: percent});
      })
    }
  });
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
