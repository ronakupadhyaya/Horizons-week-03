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
  Project.find(function(error, projects){
    if (error) {
      console.log("error", error);
    } else {
      res.render('index', {
        projects: projects
      });
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
  req.check('title', 'blank title').notEmpty();
  req.check('goal', 'blank goal').notEmpty();
  req.check('description', 'blank description').notEmpty();
  req.check('start', 'blank start').notEmpty();
  req.check('end', 'blank end').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.render('new', {
      errors: errors
    });
  } else {
    var newProject = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    });
    newProject.save({}, function(error){
      if (error) {
        console.log("error", error);
      } else {
        res.redirect('/');
      }
    })
  }
})
//   if(req.body.title && req.body.goal && req.body.description && req.body.start && req.body.start && req.body.end){
//     var newProject = new Project({
//       title: req.body.title,
//       goal: req.body.goal,
//       description: req.body.description,
//       start: req.body.start,
//       end: req.body.end
//     });
//     newProject.save({}, function(error){
//       if (error) {
//         console.log("error", error);
//       } else {
//         res.redirect('/');
//       }
//     })
//   } else {
//     res.render('new', {
//       title: req.body.title,
//       goal: req.body.goal,
//       description: req.body.description,
//       start: req.body.start,
//       end: req.body.end
//     });
//   }
// });

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(error, project){
    if(error) {
      console.log("error", error);
    } else {
      res.render('project', {
        project: project
      })
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(error, project){
    if(error) {
      console.log("error", error);
    } else {
      project.contributions.push({
        name: req.body.name,
        amount: req.body.amount
      });
      project.save(function(error, project){
        if (error) {
          console.log("error", error);
        } else {
          res.render('project', {
            project: project
          })
        }
      })
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(error, project){
    if(error) {
      console.log("error", error);
    } else {
      res.render('editProject', {
        project: project
      })
    }
  });
});

router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }, function(error, project){
    if(error) {
      console.log("error", error);
    } else {
      project.save(function(error, project){
        if (error) {
          console.log("error", error);
        } else {
          res.render('project', {
            project: project
          })
        }
      })
    }
  });
});

module.exports = router;
