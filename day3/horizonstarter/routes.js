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

// Exercise 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  // YOUR CODE HERE

  Project.find({}, function(error, projects) {
    if (error) {
      console.log('Error', error);
    } else {
      console.log('Projects', projects);
      Project.find(function(err, array) {
        res.render('index', {
          items: projects
        });
      });
    }
  });


});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render("new");
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  // if (errors) {
  //   console.log(errors);
  //   res.render('register', {
  //     errors: errors
  //   });
  // } else {
  //   // YOUR CODE HERE
  //   // Include the data of the profile to be rendered with this template
  //   req.body.date = new Date();
  //   res.render('profile', req.body);
  // }


  function validate(req) {
    var schema = {
      'title': {
        notEmpty: true,
        errorMessage: 'fill in title'
      },
      'goal': {
        isInt: true,
        errorMessage: 'fill in goal'
      },
      'start': {
        notEmpty: true,
        errorMessage: 'fill in start date'
      },
      'end': {
        notEmpty: true,
        errorMessage: 'fill in end date'
      }
    };
    req.checkBody(schema);

  }

  validate(req);

  var errors = req.validationErrors();
  if (errors) {
    // do something with the errors
    res.render('new', {
      errors: errors
    });
  } else {
    console.log(req.body);

    //push project
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });

    project.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        // res.send('Success: created a Project object in MongoDb');
        console.log("created project " + req.body.title);
        res.redirect("/");
      }
    });
  }



});


// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE

  // console.log(req.query.projectid);
  console.log("pid" + req.params.projectid);
  console.log(Project.findById(req.params.projectid));

  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log("Error", err);
    } else {
      res.render('project', {
        title: found.title,
        goal: found.goal,
        description: found.description,
        start: found.start,
        end: found.end
      });
    }
  });
  // render("project");

  // Project.findById(, function(error, projects) {
  //   if (error) {
  //     console.log('Error', error);
  //   } else {
  //     console.log('Projects', projects);
  //     Project.find(function(err, array) {
  //       res.render('index', {
  //         items: projects
  //       });
  //     });
  //   }
  // });


});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;