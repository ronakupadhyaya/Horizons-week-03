"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var expressValidator = require('express-validator');
var util = require('util');
var bodyParser = require('body-parser');

var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

var app = express();
app.use(bodyParser.json());
app.use(expressValidator());
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
  Project.find(function(err,task) {
    res.render('index',{
      projects: task
    });
  });
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
  /*
  req.checkParams('title', 'Invalid title').notEmpty();
  req.checkParams('goal', 'Invalid goal').notEmpty();
  req.checkParams('description', 'Invalid description').notEmpty();
  req.checkParams('startDate', 'Invalid startDate').notEmpty();
  req.checkParams('endDate', 'Invalid endDate').notEmpty();
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      return;
    }
    */
  var newProject = new Project({
      title:req.body.title,
      goal:req.body.goal,
      description:req.body.description,
      start:req.body.startDate,
      end:req.body.endDate,
      category:req.body.category
    });
  newProject.save(function(err) {
    console.log(err)
    if(err) {
      res.render('new',{
        project:newProject
      })
    } else {
      res.redirect('/');
    }
  });
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, found) {
    if (err) {
      res.send(err);
    } else {
      console.log(found)
      var percentage = found.contributions.length/found.goal*100;
      var contriNum = 0;
      found.contributions.forEach(function(contri) {
        contriNum += parseInt(contri.amount);
      })
      res.render('project', {
        project: found,
        start: strftime('%B %d, %Y', found.start),
        end: strftime('%B %d, %Y', found.end),
        category:found.category,
        percentage: percentage,
        contriNum:contriNum
      });
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id,function(err,found) {
    if (err) {
      res.send(err);
    } else {
      console.log(req.body.name,req.body.amount)
      if (req.body.name !== "" && !isNaN(req.body.amount)) {
        var newObj = {name:req.body.name,amount: parseInt(req.body.amount)};
        console.log(found.contributions)
        var c = found.contributions || [];
        c.push(newObj)
        //found.contributions.push(newObj);
        found.contributions = c;
        console.log(found.contributions)
        found.update({contributions:found.contributions},function(err,savedObject) {
          console.log(savedObject)
          res.redirect('/project/'+id)
        })
      }
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
