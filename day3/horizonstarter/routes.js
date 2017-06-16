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
  var sort = req.query.sort;
  var sortDirection = req.query.sortDirection;
  var dir;
  if(sortDirection === "descending"){
    dir = -1;
  }
  else{
    dir = 1;
  }
  Project.find(function(err, array) {
    console.log(array);
    if (req.query.sort) {
      var sortObject = {};
      sortObject[req.query.sort] = dir;
      Project.find().sort(sortObject).exec(function(err, array) {
        // YOUR CODE HERE
        res.render('index', {
          projectsArr: array
        })
      });
    }
    else{
      res.render('index', {
        projectsArr: array
      })
    }
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  var enumVals = Project.schema.path('category').enumValues;
  res.render('new', {
    enumVals: enumVals
  });
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  var newProj = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  })
  newProj.save(function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/');
    }
  });
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var total = 0;
  var projID = req.params.projectid;
  Project.findById(projID, function(err, proj){
    proj.contributions.forEach(function(item){
      total += item.amount;
    })
    proj['total'] = total;
    proj['percentage'] = total/proj['goal']*100;
    res.render('project', proj);
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projID = req.params.projectid;
  Project.findById(projID, function(err, project){
    if (err) {
      console.log(err);
    }
    else {
      var contObj = {
        name: req.body.name,
        amount: req.body.amount
      };
      project.contributions.push(contObj);
      project.save(function(err){
        if(err){
          console.log(err);
        }
        else{
          res.redirect('/project/' + projID);
        }
      });
    }
  });
});
// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res){
  var projID = req.params.projectid;
  var enumVals = Project.schema.path('category').enumValues;
  Project.findById(projID, function(err, proj){
    var realStart = proj.start.toISOString().substring(0,10);
    var realEnd = proj.end.toISOString().substring(0,10);
    res.render('editProject', {
      proj: proj,
      enumVals: enumVals,
      realStart: realStart,
      realEnd: realEnd,
      silly: proj.category
    });
  });
})

router.post('/project/:projectid/edit', function(req, res){
  var projID = req.params.projectid;
  Project.findByIdAndUpdate(projID, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  },
  function(err){
    res.redirect('/project/' + projID);
  })
})

router.post('/api/project/:projectId/contribution', function(req, res){
  var projID = req.params.projectId;
  Project.findById(projID, function(err, proj){
    if(err){
      console.log(err);
    }
    else{
      
    }
  })
})

module.exports = router;
