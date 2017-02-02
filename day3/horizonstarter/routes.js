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
  Project.find({},function(err, array) {
    if (err){
      return err;
    }

    res.render('index', {array});



  });
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render("new")
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  req.checkBody('goal', 'Amount is required').notEmpty();
  req.checkBody('goal', 'Amount must be an integer').isInt();
  req.checkBody('end', 'End is required').notEmpty();
  req.checkBody('end', 'End must be a date').isDate();
  var errors = req.validationErrors();
  console.log(errors)
  if(!(errors)){
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: new Date(),
      end: req.body.end,
    });

    project.save(function (err, task) {
      if(err){
        return err;
      } 
      res.redirect('/')
    });
  }else{
    res.render('new', {errors: errors});
  }

});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {res.send(err);}
    else{
      // if(!err){
      //   var project = new Project({
      //     title: req.body.title,
      //     goal: req.body.goal,
      //     description: req.body.description,
      //     start: new Date(),
      //     end: req.body.end,
      //   });

      //   project.save(function (err, task) {
      //     if(err){
      //       return err;
      //     } 
      //     res.redirect('/')
      //   });
    }
    console.log(project)
    res.render('project', project);
    
  });

});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {res.send(err);}
    else{
      var contribute = {
        name: req.body.name,
        amount: req.body.amount
      };

      project.contributions.push(contribute);
      
      project.save(function (err, task) {
        if(err){
          return err;
          res.redirect('/')
        } 
        res.render('project', project);

      });


    }
  });
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
