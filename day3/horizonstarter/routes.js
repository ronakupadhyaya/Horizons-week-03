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
  Project.find(function(err, item) {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('index', {items: item});
    }
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.check('title', 'title field is required').notEmpty();
  req.check('goal', 'goal field is required').notEmpty();
  req.check('goal', 'goal needs to be an int').isInt();
  req.check('start', 'start field is required').notEmpty();
  req.check('end', 'end field is required').notEmpty();

  var errors = req.validationErrors();
  if (errors.length > 0) {
    var obj = {};
    for (var i = 0; i < errors.length; i++) {
      obj[errors[i].param] = errors[i].msg;
    }
    res.render('new', obj);
  } else {
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
    project.save(function(err) {
      if (err) {
        console.log('Error: ', err);
      } else {
        res.redirect('/');
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log("Error: ", err);
    } else {
      res.render('project', found);
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log("Error: ", err);
    } else {
      req.check('contributorName', 'contributor name is required').notEmpty();
      req.check('amount', 'amount is required').notEmpty();
      req.check('amount', 'amount should be greater than 0').gt(0);

      var errors = req.validationErrors();
      if (errors.length > 0) {
        for (var i = 0; i < errors.length; i++) {
          found[errors[i].param] = errors[i].msg;
        }
      } else {
        found['contributorName'] = '';
        found['amount'] = '';
        var obj = {
          name: req.body.contributorName,
          amount: req.body.amount
        };

        found.contributions.push(obj);
        var total = found.contributions.reduce(function(a, b) {
          if (isNaN(parseInt(b.amount))) {
            b.amount = 0;
          }
          return a + parseInt(b.amount);
        }, 0);
        found.percent = total / found.goal * 100;
        found.total = total;
        found.save(function(err) {
          if (err) {
            console.log("Error: ", err);
          } else {
            res.redirect('/project/' + req.params.projectid);
          }
        });
      }
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
