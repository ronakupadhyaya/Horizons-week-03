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
  if(req.query.sort){
    var sortObject = {};
    sortObject[]={}
    Project.find().sort(sortObject).exec(function(err, array) {
      // returns an array sorted by the order
      res.render('index', {projects: array});
    });
  }
  else{
    Project.find(function(err, proj){
      if(err){
        res.status(500).send(err)
      }
      else{
        res.render('index', {projects: proj});
      }
    })
  }
//
//
//   if (req.query.sort) {
//     var sortObject = {};
//     if (req.query.sortDirection == "ascending") {
//       sortObject[req.query.sortDirection] = 1;
//     }
//     else {
//       sortObject[req.query.sortDirection] = -1;
//     }
//     sortObject[req.query.sort] = 1;
//     Project.find().sort(sortObject).exec(function(err, array) {
//       // returns an array sorted by the order
//       res.render('index', {projects: array});
//     });
//   }
//   else{
//
//   }
// })

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  req.checkBody('title', 'Must have title').notEmpty()
  req.checkBody('goal', 'Must have goal').notEmpty().isInt()
  req.checkBody('description', 'Must have description').notEmpty()
  req.checkBody('start', 'Must have start date').notEmpty()
  req.checkBody('end', 'Must have end date').notEmpty()
  var error = req.validationErrors();
  if (error) {
    res.render('new', {
      error: error
    });
  }
  else {
    var newProject = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    })
    newProject.save(function(err, proj) {
      if(err) {
        console.log('Error: ',err)
      }
      else {
        res.redirect('/');
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var tot = 0;
  var percent = 0;
  var singleProj = req.params.projectid
  Project.findById(singleProj, function(err, proj){
    proj.contributions.forEach(function(contribution){
      tot = tot + contribution.amount;
      percent = ((tot/proj.goal)*100) + '%';
    })
    if(err){
      console.log('Error', err)
    }
    else {
      res.render('project', {
        projId: singleProj,
        title: proj.title,
        goal: proj.goal,
        description: proj.description,
        start: proj.start,
        end: proj.end,
        tot: tot,
        percent: percent,
        contributions: proj.contributions,
        category: proj.category
      })
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, proj){
    if(err){
      console.log('Error', err)
    }
    else {
      proj.contributions.push({
        name: req.body.name,
        amount: req.body.amount
      })
      proj.save(function(err, proj){
        res.redirect('/project/' + req.params.projectid)
      })
    }
  })

});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  var singleProj = req.params.projectid;
  Project.findById(singleProj, function(err, proj){
    if(err){
      console.log('Error', err)
    }
    else {
      var start = new Date(proj.start).toISOString().substring(0, 10);
      var end = new Date(proj.end).toISOString().substring(0, 10);
      console.log("time", proj.start)
      res.render('editProject', {
        projId: singleProj,
        title: proj.title,
        goal: proj.goal,
        description: proj.description,
        start: start,
        end: end,
        contributions: proj.contributions,
        category: proj.category
      })
    }
  })
});

router.post('/project/:projectid/edit', function(req, res){
  var proj = req.body
  Project.findByIdAndUpdate(req.params.projectid, {
  title: proj.title,
  goal: proj.goal,
  description: proj.description,
  start: proj.start,
  end: proj.end,
  category: proj.category
}, function(err) {
  // YOUR CODE HERE
  res.redirect('/project/'+req.params.projectid)
});
})

// Create the POST /project/:projectid/edit endpoint

module.exports = router;
