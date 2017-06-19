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
// router.get('/', function(req, res) {
//   Project.find(function(err, projects) {
//     res.render('index', {projects: projects, title: "horizonStarter"})
//   })
// });

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new', {
    category: [
    'Famous Muppet Frogs',
    'Current Black Presidents',
    'The Pen is Mightier',
    'Famous Mothers',
    'Drummers Named Ringo',
    '1-Letter Words',
    'Months That Start with "Feb"',
    'How Many Fingers Am I Holding Up',
    'Potent Potables'
    ]
  });
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // // YOUR CODE HERE

  var project = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  });
  project.save(function(err) {
    res.redirect('/')
  })

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid/', function(req, res) {
  // YOUR CODE HERE
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err, project) {
    if (err) {
      res.send(err)
    } else {
      var sum = 0;
      project.contributions.forEach(function(t) {
        sum += parseInt(t.amount)
      })
      var percent = (sum/project.goal)*100;
      res.render('project', {
        project: project,
        contributions: project.contributions,
        sum : sum,
        percent: percent
      })
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid/', function(req, res) {
  // YOUR CODE HERE
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err, project) {
    project.contributions.push({name: req.body.name, amount: req.body.amount})
    project.save(function() {
      var sum = 0;
      project.contributions.forEach(function(t) {
        sum += parseInt(t.amount)
      })
      var percent = (sum/project.goal)*100;
      res.render('project', {

        project: project,
        contributions: project.contributions,
        sum : sum,
        percent: percent
      })
    })
  })
})

router.get('/project/:projectid/edit', function(req, res) {
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err, project){
    res.render('editProject', {
      id: project._id,
      title: project.title,
      goal: project.goal,
      description: project.description,
      start: project.start,
      end: project.end
    })
  })
})

router.post('/project/:projectid/edit', function(req, res) {
  var projectid = req.params.projectid;

  Project.findById(projectid, function(err, project){
    project.title= req.body.title
    project.goal= req.body.goal
    project.description= req.body.description
    project.start= req.body.start
    project.end= req.body.end

    project.save(function(err, savedProject) {
      console.log(savedProject)
      res.render('editProject', {
        id: savedProject._id,
        title: savedProject.title,
        goal: savedProject.goal,
        description: savedProject.description,
        start: savedProject.start,
        end: savedProject.end
      })
   })
  })
})

router.get('/', function(req, res) {
  var selectSort = req.query.sort;
  var selectDirection = req.query.sortdirection;

  if (selectDirection === "descending") {
    Project.find().sort("-" + selectSort).exec(function(err, array) {
      res.render('index', {
        projects: array,
        sort: selectSort
      })
    })
  } else {  
    Project.find().sort(selectSort).exec(function(err, array) {
      res.render('index', {
        projects: array,
        sort: selectSort
      })
    })
  }
})

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
