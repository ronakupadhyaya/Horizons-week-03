"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json 
router.use(bodyParser.json())

// Example endpoint
router.get('/create-test-project', function (req, res) {
  var project = new Project({
    title: 'I am a test project'
  });
  project.save(function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send('Success: created a Project object in MongoDb');
    }
  });
});

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function (req, res) {
  // YOUR CODE HERE
  Project.find(function (error, projects) {
    res.render('index', {
      projects: projects
    })
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function (req, res) {
  // YOUR CODE HERE
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function (req, res) {
  // YOUR CODE HERE
  var body = req.body;
  var title = body.title;
  var goal = body.goal;
  var description = body.description;
  var start = body.start;
  var end = body.end;
  console.log('Values!!!:', title, goal, description, start, end)
  if (!(title && goal && start && end)) {
    res.render('new', {
      error: "Some of the fields are empty.",
      title: title,
      goal: goal,
      description: description,
      start: start,
      end: end
    })
  } else {
    var newProject = new Project({
      title: title,
      goal: goal,
      description: description,
      start: start,
      end: end
    })
    newProject.save(function (error) {
      if (error) {
        res.send('Creating a new project has failed..')
      } else {
        res.redirect('/');
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function (req, res) {
  // YOUR CODE HERE
  var projectId = req.params.projectid;
  Project.findById(projectId, function (error, project) {
    if (project) {
      var totalContributions = 0;
      for (var i = 0; i < project.contributions.length; i++) {
        totalContributions += parseInt(project.contributions[i].amount);
      }
      var percentComplete = totalContributions / project.goal * 100;
      res.render('project', {
        project: project,
        totalContributions: totalContributions,
        percentComplete: percentComplete
      })
    } else {
      res.send('The specified project was not found..')
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function (req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function (error, project) {
    if (project) {
      contribution.amount = req.body.amount;
      contribution.name = req.body.name;
      project.contributions.push({
        amount: contribution.amount,
        name: contribution.name
      });
      project.save(function (error) {
        if (!error) {
          console.log('Saved successfully!')
          res.redirect('/project/' + project._id);
        } else {
          console.log('Failed to save contribution..')
        }
      });
    } else {
      console.log('Invalid Project ID..')
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
