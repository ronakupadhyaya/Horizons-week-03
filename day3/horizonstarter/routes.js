"use strict";
// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');


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
  Project.find(function(err, array) {
    res.render('index', {items: array});
  });
});
// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new')
});
// Exercise 2: Create project
// Implement the POST /new endpoint

function validate(req) {
  req.checkBody('title', 'Please input title').notEmpty();
  req.checkBody('goal', 'Please input goal').notEmpty();
  req.checkBody('startdate', 'Please input start date').notEmpty();
  req.checkBody('enddate', 'Please input end date').notEmpty();
}

router.post('/new', function(req, res) {
  validate(req);
  var errors = req.validationErrors();
  if (errors) {
    res.render('new', {errors: errors});
  } else {
    var info = req.body;
    var proj = new Project({
      title: info.title,
      goal: parseInt(info.goal),
      description: info.description,
      start: new Date(info.startdate),
      end: new Date(info.enddate)
    })
    proj.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.redirect('/')
      }
    })
  }
});



// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  // Get the Project with the given projectid from MongoDb
  // using Project.findById() then render project.hbs with
  // this Project. You can find projectid under req.params.
  Project.findById(req.params.projectid, function(err, project) {
    console.log(project);
    res.render('project', project);

  });
});
// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
 // YOUR CODE HERE
 Project.findById(req.params.projectid, function(err, proj){
   if (proj.contributions) {
     proj['contributions'].push({name:req.body.name ,amount:req.body.amount});
     proj.save();
     res.redirect('/');
   } else {
     proj['contributions'] = [];
     proj.contributions.push({name:req.body.name ,amount:req.body.amount});
     proj.save();
     res.redirect('/');
   }
 });


});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
module.exports = router;
