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
  res.render('index', {items: array});
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

  var newProject = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.enum
  })
  newProject.save(function(error){
    if(error) {
      res.send(error)
    } else {
      res.redirect('/')
    }
  })
})


  // Part 3: View single project
  // Implement the GET /project/:projectid endpoint
  router.get('/project/:projectid', function(req, res) {
    // YOUR CODE HERE
    Project.findById(req.params.projectid, function(error, project){
      if(error){
        res.send(error)
      } else {
        var totalAmount = 0;
        for(var i = 0; i < project.contributions.length; i++){
          totalAmount += project.contributions[i]['amount']
        }

        totalAmount = totalAmount/project.goal * 100;


        res.render('project', {
          title: project.title,
          goal: project.goal,
          description: project.description,
          start: project.start,
          end: project.end,
          totalAmount: totalAmount
        })
      }
    })
  });

  // Part 4: Contribute to a project
  // Implement the GET /project/:projectid endpoint
  router.post('/project/:projectid', function(req, res) {
    // YOUR CODE HERE
    Project.findById(req.params.projectid, function(error, project){
      var contributionsObj = {
        name: req.body.name,
        amount: req.body.amount
      }
      project.contributions.push(contributionsObj)
      project.save(function(error){
        if(error){
          res.send(error)
        } else {
          res.redirect('/project/' + req.params.projectid)
        }
      })
    })
  });

  // Part 6: Edit project
  // Create the GET /project/:projectid/edit endpoint
  router.get('/project/:projectid/edit', function(req, res){
    Project.findById(req.params.projectid, function(error, project){
      if(error){
        res.send(error)
      } else {
        console.log(project.description);
        res.render('editProject', {
          id: project._id,
          title: project.title,
          goal: project.goal,
          description: project.description,
          start: project.start.toJSON().slice(0, 10),
          end: project.end.toJSON().slice(0, 10),
          category: project.category
        })
      }
    })
  })
  // Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
    // YOUR CODE HERE
  }, function(err) {
    if(!err) {
      res.redirect('/')
    }
  });
})
module.exports = router;
