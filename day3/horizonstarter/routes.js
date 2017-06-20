"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
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
  Project.find(function(err,array){
    if(err) {
      console.log('view all projects failed');
    } else {
      res.render('index',{array:array});
    }
  })
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
  req.checkBody('title','You need a title').notEmpty();
  req.checkBody('goal','You need a goal').notEmpty();
  req.checkBody('start','You need a start date').notEmpty();
  req.checkBody('end','You need an end date').notEmpty();
  var result = req.validationErrors();
  if (result){
    console.log('your fields are not filled');
  }else {
    var newPost = new Project ({
      title:req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start:req.body.start,
      end: req.body.end
    });
    newPost.save();
    res.redirect('/');
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid,function(err,found){
    if (err || !found) {
      console.log(err);
    } else {
      res.render('project',
     {title:found.title,
      goal:found.goal,
      desc:found.description,
      start:found.start,
      end:found.end})
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid,function(err,found){
    if (err) {
      console.log(err);
    } else {
      req.checkBody('name','You need a name').notEmpty();
      req.checkBody('amount','You need a amount').notEmpty();
      var result = req.validationErrors();
      if (result){
        console.log('your fields are not filled');
      }else {
        var obj = {name:req.body.name,
                   amount:parseInt(req.body.amount)};
        found.contributions.push(obj);
        found.save({contributions: found.contributions}, function(err){
          console.log('save err');
          res.redirect('/project/' + found._id);
        });
      }
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
