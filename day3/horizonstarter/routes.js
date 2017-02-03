"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var expressValidator = require('express-validator');

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

// Exercise 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  Project.find(function(err, array) {
    res.render('index', {items: array});
  });
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {})
});

// Exercise 2: Create project
// Implement the POST /new endpoint

function validate(req) {
  req.checkBody('title', 'Please input title').notEmpty();
  req.checkBody('goal', 'Please input goal').notEmpty();
  req.checkBody('start', 'Please input start date').notEmpty();
  req.checkBody('end', 'Please input end date').notEmpty();
}

router.post('/new', function(req, res) {
  validate(req);
  var errors = req.validationErrors();
  if (errors) {
    res.render('new', {errors: errors});
  } else {
    var info = req.body;
    console.log("info",info);
    var post = new Project({
      title: info.title,
      description: info.description,
      goal: parseInt(info.goal),
      start: new Date(info.start),
      end: new Date(info.end),
      category: info.category,
      percentraised: 0,
      totalraised: 0
    });
    console.log("post", post)
    post.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.redirect('/')
      }
    })
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  // Get the Project with the given projectid from MongoDb
  // using Project.findById() then render project.hbs with
  // this Project. You can find projectid under req.params.
  Project.findById(req.params.projectid, function(err, project) {
    console.log(project)
    res.render('project', {project: project});
  });
})


// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    var info = req.body;
    project.contributions.push(info)
    project.totalraised += parseInt(project.contributions[project.contributions.length-1].amount)
    var perctotal = (100*(project.totalraised)/(project.goal)).toFixed(1);
    project.percentraised = perctotal;
    project.save()
    res.render('project', {project: project});
  });
});


// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/projects/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    console.log("project", project)
    res.render('editProject', {project: project});
  });
})

router.post('/projects/:projectid/edit', function(req, res) {
  var info = req.body;
  Project.findByIdAndUpdate(req.params.projectid, {
    title: info.title,
    description: info.description,
    goal: parseInt(info.goal),
    start: new Date(info.start),
    end: new Date(info.end),
    category: info.category,
    percentraised: 0,
    totalraised: 0
  }, function(err) {
    if (err) {
      res.status(500).json(err);
    }
    else {
      var errors = req.validationErrors();
      if (errors) {
        res.render('/projects/:projectid/edit', {errors: errors});
      }
      else {
        var info = req.body;
        if (err) {

        } else {
          res.redirect('/')}
        }
      }
    })
  }
)
    // Create the POST /project/:projectid/edit endpoint

    module.exports = router;
