"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var app = express();
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var expressValidator = require('express-validator');
app.use(expressValidator());

//changing date format helper
function toDateStr(date) {
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}

// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({title: 'I am a test project'});
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

  console.log(req.query);
  if (req.query.sort) {
    var sortVar = req.query.sort;
    if (req.query.sortDirection) {
      var dir = req.query.sortDirection;
      var sortObject = {};
      sortObject[sortVar] = dir;

      Project.find().sort(sortObject).exec(function(err, array) {

      });
    } else {

      Project.find().sort({sortVar: 'ascending'}).exec(function(err, array) {})
    }
  }

    Project.find(function(err, array) {
      res.render('index', {projects: array});
    });


});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new')
});

// Exercise 2: Create project
// Implement the POST /new endpoint
function validate(req) {
  req.checkBody('title', 'Invalid title').notEmpty();
  req.checkBody('goal', 'Invalid goal').notEmpty().isInt();
  req.checkBody('start', 'Invalid startDate').notEmpty();
  req.checkBody('end', 'Invalid endDate').notEmpty();
}

router.post('/new', function(req, res) {
  validate(req);

  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.render('new', {
      errors: errors,
      info: req.body
    });
  } else {
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    });
    project.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.redirect('/');
      }
    });
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, projectFound) {

    res.render('project', {project: projectFound});
  });
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, projectFound) {

    projectFound.contributions.push({name: req.body.name, amount: req.body.amount});
    var num = projectFound.contributions.reduce(function(a, b) {
      console.log(a);
      console.log(b);
      return a + parseInt(b.amount);
    }, 0)

    var progress = (num / projectFound.goal) * 100;
    projectFound.progressStr = JSON.stringify(progress) + '%';

    projectFound.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.redirect('/');
      }
    });
  });
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
var options = [
  'Famous Muppet Frogs',
  'Current Black Presidents',
  'The Pen Is Mightier',
  'Famous Mothers',
  'Drummers Named Ringo',
  '1-Letter Words',
  'Months That Start with "Feb"',
  'How Many Fingers Am I Holding Up',
  'Potent Potables'
]

router.get('/projects/:projectid/edit', function(req, res) {

  Project.findById(req.params.projectid, function(err, projectFound) {
    res.render('editProject', {
      info: projectFound,

      options: options
    });

  })

})

router.post('/projects/:projectid/edit', function(req, res) {

  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category

  }, function(err, foundProject) {
    console.log(foundProject);
  });
  res.redirect('/');

})

module.exports = router;
