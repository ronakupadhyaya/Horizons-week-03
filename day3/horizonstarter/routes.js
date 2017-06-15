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
  Project.find(function(err,arr){
    res.render('index',{
      projects:arr
    })
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new.hbs')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {

    // create new project and redirect
    var newProject = new Project({
      title:req.body.title,
      goal:req.body.goal,
      description:req.body.description,
      start:req.body.start,
      end:req.body.end
    })
    newProject.save(function(err,p) {
      if (err) {
        res.render('new.hbs',{
          title2:req.body.title,
          goal2:req.body.goal,
          description2:req.body.description,
          start2:req.body.start,
          end2:req.body.end,
          err:err
        })
      }
      else {
        res.redirect('/')
      }
    });

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, p) {
    // contributions=[{name:amy,amount:100},{name:david,amount:100}]
    var sum = p.contributions.reduce(function(a,b){
      return a+parseInt(b.amount)
    },0)
    var percent=sum/p.goal;


    res.render('project.hbs',{
      project:p,
      sum:sum,
      percent:percent,
      arr:p.contributions
    })
  })

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, p) {
    var obj={'name':req.body.name,'amount':req.body.amount};
    p.contributions.push(obj);
    p.save();
    res.redirect('/project/'+req.params.projectid)
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
