"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
// var expressValidator = require('express-validator');
// app.use(expressValidator());

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
// Implement the GET / endpoint. DONE
router.get('/', function(req, res) {
  Project.find(function(err, array) {
    res.render('index.hbs', {items: array});
  });
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // Project.find(function(err, array) { // WHY?
  //   res.render('new.hbs', {items: array});
  // });
  res.render('new.hbs');
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  req.checkBody('title', 'Invalid title').notEmpty();
  req.checkBody('goal', 'Invalid goal').notEmpty().isInt();
  req.checkBody('start', 'Invalid start date').isDate();
  req.checkBody('end', 'Invalid end date').isDate();

  var errors = req.validationErrors();
  var myProject = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end
  });

  if(errors) {
    res.render('new.hbs', {
      myProject: myProject,
      // update date properties of myProject here later
      errors: errors
    });
  } else {
    myProject.save(function(err, myProject) {
      if(err) {
        console.log('you got err!')
      } else {
        // res.render('/new');
        res.redirect('/');
      }
    });
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    console.log(req.params.projectid);
    if(err) {
      console.log('cloud error')
    } else {
      res.render('project', {
        found: found
      })
    }
  });
});

// Exercise 4: Contribute to a project
// Implement the GET BUT IT'S REALLY POST LMAO /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    console.log('this is found')
    console.log(found);
    if(err) {
      console.log('cloud error again b');
    } else {
      found.contributions.push({name: req.body.name, amount: req.body.amount})
      console.log(found.contributions)
      found.save(function(err, found) {
        if(err) {
          console.log('you got a deeper err')
        } else {
          res.render('project', {
            found:found
          })
        }
      })
    }
  })
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
