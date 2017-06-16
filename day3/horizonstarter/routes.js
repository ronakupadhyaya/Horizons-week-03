"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
// router.get('/create-test-project', function(req, res) {
//   var project = new Project({
//     title: 'I am a test project'
//   });
//   project.save(function(err) {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.send('Success: created a Project object in MongoDb');
//     }
//   });
// });

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  // YOUR CODE HERE
  Project.find(function(err, arr) {
    console.log(arr);
    res.render('index', {projects: arr});

  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render("new");

});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  var project = new Project( {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    category: req.body.category,
    start: req.body.start,
    end: req.body.end
  });

  project.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.redirect("/");
    }
  });
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, arr) {
    if (err) {res.status(500).json(err);}

    var goal = parseInt(arr.goal);
    var donations = 0;
    
    
    for (var i = 0; i < arr.contributions.length; i++) {
      donations += parseInt(arr.contributions[i].amount);
    }
    var progress = (donations/goal) * 100;
    res.render("project", {project: arr, progress: progress});
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, arr) {
    if (err) {res.status(500).json(err);}

    var donation = {name: req.body.name, amount: req.body.amount};
    arr.contributions.push(donation);
    arr.save();
    res.redirect("/project/" + req.params.projectid);
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, arr) {
    if (err) {res.status(500).json(err);}

    res.render("edit", {project: arr});
  });
});

router.post('/project/:projectid/edit', function(req, res) {
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    category: req.body.category,
    start: req.body.start,
    end: req.body.end
  }, function(err) {
    if (err) {res.status(500).json(err);}
    res.redirect("/project/" + req.params.projectid);
  });
});

module.exports = router;
