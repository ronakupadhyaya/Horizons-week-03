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
  Project.find(function(err, array){
    if (err) {
      console.log(`Something went wrong: ${err}`);
    } else {
      res.render('index', {
        projects: array,
      })
    }
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE



  res.render('new', {
    title: "",
    goal: "",
    description: "",

    // TODO what to initialize start and end with DATES??!
    start: {},
    end: {}

  })
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  var valid = true;

  // TODO validating the entries
  for(var key in req.body){
    if (!req.body[key]) {
      valid = false;
      req.body[key] = 'ERROR';
    }
  }
  if (valid) {
    var proj = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
    proj.save(function(err){
      if (err) {
        console.log(`Something went wrong: ${err}`);
      } else {
        res.redirect('/');
      }
    })
  } else {
    res.render('new', {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, proj){
    if (err) {
      console.log(`Something went wrong: ${err}`);
      res.render('project', {
        id: 'not found',
        project: {
          title: ""
        }
      })
    } else {
      var amountTotal = 0;
      var percentageGoal = 0;
      proj.contributions.forEach(function(contribution){
        amountTotal += contribution.amount;
      })
      if (amountTotal < proj.goal) {
        percentageGoal = amountTotal/proj.goal
      } else {
        percentageGoal = 100;
      }

      res.render('project', {
        id: id,
        project: proj,
        percent: percentageGoal
      })
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  //TODO sum up the total number of contributions HERE

  //TODO show the total number of contributions

  //TODO make the contribution bar

  var id = req.params.projectid;
  Project.findById(id, function(err, proj){
    if (err) {
      console.log(`Something went wrong: ${err}`);
      res.render('project', {
        id: 'not found',
        project: {
          title: ""
        }
      })
    } else {
      var amountTotal = 0;
      var percentageGoal = 0;
      var contribution = {
        name: req.body.name,
        amount: req.body.amount
      };
      proj.contributions.push(contribution)
      proj.save();
      proj.contributions.forEach(function(contribution){
        amountTotal += contribution.amount * 1;
      })
      if (amountTotal <= proj.goal) {
        percentageGoal = amountTotal/proj.goal * 100;
      } else {
        percentageGoal = 100;
      }
      console.log(`percent is ${percentageGoal}`);
      res.render('project', {
        id: id,
        project: proj,
        percent: percentageGoal,
        amountTotal: amountTotal
      })
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
