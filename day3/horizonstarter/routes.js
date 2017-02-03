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
  Project.find(function(err, array){
    res.render('index',{
      items: array
    })
  })
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new')
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
var product = new Project(req.body)
console.log("hello");
console.log(req.body);


product.save(function(err){
  if(err){
    res.render('new', {
      error: err,
      message: "Error",
      product: product
    })
  } else {
    res.redirect('/');
  }
})
  //.render('new')
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project){
    res.render('project', {
      project: project
    })
  });
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project){
    var contribution = {name: req.body.name , amount: req.body.amount}
    project.contributions.push(contribution)
    project.save(function(err){
      if(err){
        res.render('/project/'+req.params.projectid, {
          error: err,
          message: "Error",
          project: project,
          contribution: contribution
        })
      } else {
        res.redirect('/project/'+req.params.projectid)
      }
    })
  })


});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/projects/:projectid/edit', function(req,res){
  Project.findById(req.params.projectid, function(err, product){
    res.render('editProject', {
      product: product
  })
})
})

router.post()


router.post('')



module.exports = router;
