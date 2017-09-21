"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
router.use(bodyParser.urlencoded({
  extended: true
}))
// router.use(bodyParser.json());
// router.engine('hbs', exphbs({
//   extname: 'hbs',
//   defaultLayout: 'main.hbs'
// }));
// router.set('view engine', 'hbs');

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
  Project.find(function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("we got here");
      res.render('index', {
        data: result
      })
    }
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {})
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  var newProject = new Project({
    "title": req.body.title,
    "goal": req.body.goal,
    "description": req.body.description,
    "start": req.body.start,
    "end": req.body.end
  });
  newProject.save(function(err, result) {
    if (err) {
      console.log(err);
      res.render('new', {
        alertdisplay: true,
        alert: err,
        name: "name",
        goal: 12356,
        start: new Date(11 / 11 / 2017),
        end: new Date(11 / 11 / 2027)
      });
    } else {
      res.redirect('/');
      console.log("Saved!");
    }
  })
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById({
    _id: req.params.projectid
  }, function(error, result) {
    if (error) {
      console.log(error);
    } else {
      res.render('project', result)
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById({
    _id: req.params.projectid
  }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("found project");
      var editedProject = result;
      editedProject.contributions.push({
        name: req.body.name,
        amount: req.body.amount
      })
      editedProject.save()
      var contributionsnum = editedProject.contributions.length
      var complete = editedProject.contributions.reduce(function(sum, val) {
        return sum + val.amount
      }, 0) * 100 / editedProject.goal
      res.render('project', {
        project: editedProject,
        count: contributionsnum,
        complete: complete
      })
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
