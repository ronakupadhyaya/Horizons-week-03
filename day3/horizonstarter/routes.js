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
  console.log(process.env.MONGODB_URI)
  Project.find(function(err, arr) {
    res.render('index', {items: arr})
  });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  console.log('reached new!');
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  console.log('reaches post new!');

  var proj = {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end
  }

  var project = new Project(proj)
  project.save(function(err) {
    if (err) {
      console.log('reaches error');
      res.render('new', {
        missedField: true
      })
    } else  {
      console.log('reaches redirect');
      res.redirect('/')
    }
  })
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  console.log('REACHES HERE');
  var id=req.params.projectid;
  var proj = Project.findById(id, function(err, project) {
    console.log("***project to find***"+project);
    var sum = 0;
    //(item.contributions).forEach(function(e){sum += parseInt(e["amount"]);})
    project.contributions.forEach(function(ctb) {
      sum += parseInt(ctb.amount)
    });
    var percentage = sum/proj.goal;
    res.render('project', {
      project: project,
      total: sum,
      percentage: percentage
    });
  });
});
// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var id=req.params.projectid;
  var person = req.body.name;
  var amt = req.body.amount;
  var contrib = {name: person, amt: amt}

  Project.findById(req.params.projectid, function(err, item){
    if(err){
      console.log(err);
    }
    else{
      console.log(req.body.name, req.body.amount);
      item.contributions.push(contrib);
      var sum = 0;
      (item.contributions).forEach(function(e){sum += parseInt(e["amount"]);});
      item.save();
      var percentage = sum/item.goal*100;
      res.render('project', {project: item, total: sum, percentage: percentage});
    }
  })

  // res.render('project/'+id, {
  //   project: project
  // })

});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
