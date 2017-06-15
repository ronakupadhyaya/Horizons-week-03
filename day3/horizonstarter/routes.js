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
  var projects = Project.find(function(err,projects){
      res.render('index',{projects:projects})
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  // if(req.body.title){res.send("hello")}
  // else{res.send("Empty!!!")}

  // req.check(req.body.title,req.body.goal,'there are empty fields').notEmpty();

  req.checkBody('title','Title cannot be empty').notEmpty();
  //what to check, the err msg if false, what to check in the req.body
  //apparently, the following block is not needed if we just put required in new.hbs
  //like this <input type="Date" name="end" value="" required>
  req.checkBody('goal','Goal cannot be empty').notEmpty();
  req.checkBody('title','Title cannot be empty').notEmpty();
  req.checkBody('start','Start date cannot be empty').notEmpty();
  req.checkBody('end','End date cannot be empty').notEmpty();
  var error = req.validationErrors();
  // console.log(error);
  if(!error){
    console.log('create new project', Project.findById())
    var newProject = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    })
    newProject.save(function(err){
      // console.log('saved');
      if(err){console.log('Error ',err)}
      else{
        res.redirect('/');
      }
    })
  } else {
    // console.log('error in input, stay on page', error)
    res.render('new',{
      error: error,
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    })
  }
  // req.getValidationResult().then(function(result){
  //   var errors = result.array();
  //   console.log(errors)
  // })
  // console.log(req.body)
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id =req.params.projectid;
  Project.findById(req.params.projectid,function(err,project){
    if(err){console.log('Error',err)}
    else{
      res.render('project',{
        project:project,
        projectid:id
      });
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid,function(err,project){
    var newObject = {
      name:req.body.name,
      amount: req.body.amount
    }
    console.log(newObject);
    project.contribution.push(newObject);
    project.save(function(err){
      if(err){console.log('Error',err)}
      else{
        console.log('saved this successfully!')

        var totalAmount=0;
        var arr = project.contribution;
        for(var i = 0;i<arr.length;i++){
          var addon = parseInt(arr[i].amount);
          totalAmount+= addon;
        }
        var goal = parseInt(project.goal);
        var percentage= totalAmount/goal*100;
        var id =req.params.projectid;
        console.log(goal,percentage);

        res.render('project',{
          project: project,
          projectid:id,
          percentage:percentage,
          totalAmount:totalAmount,
          contribution:arr
        })
      }
    })
  })
})



// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
