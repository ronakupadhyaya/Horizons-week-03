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
    res.render('index.hbs', {items: array});
  });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new.hbs');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  if(!req.checkBody('title').notEmpty() || !req.checkBody('goal').notEmpty() || !req.checkBody('start').notEmpty() || !req.checkBody('end').notEmpty()){
    res.render('new', {
      projtitle: req.body.title,
      projgoal: req.body.goal,
      projdescription: req.body.description,
      projstart: req.body.start,
      projend: req.body.end
    });
    res.status(402).send('Invalid field entry')
  } else {
    var newProj = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
    newProj.save(function(err){
      if(err){
        console.log('error:', err);
      } else {
        console.log('Gucci');
      }
    });
    // console.log(newProj);
    res.redirect('/');
  }

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, found){
    res.render('project.hbs', {
      found: found,
      contributions: found.contributions.length,
      id: id,
    });
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var project = req.params.projectid;
  Project.findById(project, function(err, found){
    if (found.length === 0){
      res.render('project.hbs', {
        found: found,
        id: project
      });
    } else {
      var totals = 0;
      for (var i = 0; i < found.contributions.length; i++) {
        totals += parseFloat(found.contributions[i].amount);
      };
      var projectGoal = found.goal;
      var projPercent = (totals/projectGoal)*100;
      var contrib = {name: req.body.nameContrib, amount: req.body.amountContrib}
      found.contributions.push(contrib)
      found.save(function(err, project){
        if(err){
          console.log("nope");
        } else {
          res.render('project.hbs',{
            found: found,
            projPercent: projPercent
          })
        }
      });
    }
    // var totals = found.contributions;
    //
    // var sum = 0;
    // totals.push(contrib);
    // // var totalContrib = found.contributions.forEach.reduce(function(a, b){return a+b}, 0);
    // totals.forEach(function(item){
    //   sum += item.amount;
    // });
    // console.log(totals);
  });

});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
