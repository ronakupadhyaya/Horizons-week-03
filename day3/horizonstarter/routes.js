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
  Project.find(function(err,arr){
    res.render('index',{
      items:arr
    })
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
  req.check('title','title cannot be empty').notEmpty();
  req.check('goal','goal must be int').notEmpty().isInt();
  req.check('description','description cannot be empty').notEmpty();
  req.check('start','start cannot be empty').notEmpty();
  req.check('end','end cannot be empty').notEmpty();
  var eArr = req.validationErrors()
  if(eArr){
    res.render('new',{
      errors: eArr
    })
  } else {
    var p = new Project({
      title: req.body.title,
      goal: parseInt(req.body.goal),
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
    p.save(function(err){
      if(err){
        res.render('new',{
          errors: eArr
        })
      }
      else{
        res.redirect('/')
      }
    })
  }

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid,function(err,p){
    if(err){
      res.send(err)
    }
    else{
      var total = 0
      p.contributions.forEach(function(item){
        total += parseInt(item.amount)
      })
      var progress = Math.floor(total/p.goal*100);
      res.render('project',{
        title: p.title,
        goal: p.goal,
        description: p.description,
        start: p.start,
        end: p.end,
        total: total,
        project_id: req.params.projectid,
        progress: progress,
        conArr: p.contributions
      })
    }
  })

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid,function(err,p){
    if(err){
      res.send(err)
    }
    else{
      p.contributions.push({name: req.body.name, amount: req.body.amount})
      p.save(function(err){
        if(err){
          res.send(err)
        }
        res.redirect('/project/'+req.params.projectid);
      })
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
