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
  Project.find(function(err, projects) {
    if(err) {
      res.send(err);
    }
    else {
      res.render('index', {
        items: projects
      })
    }
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new', {
    categories: Project.schema.path('category').enumValues.map(function (el) {
      return {val: el}
    })
  });
});

// Part 2: Create project

// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('title', 'title should not be empty').notEmpty();
  req.checkBody('goal', 'goal should not be empty').notEmpty();
  req.checkBody('description', 'description should not be empty').notEmpty();
  req.checkBody('start', 'start should not be empty').notEmpty();
  req.checkBody('end', 'end should not be empty').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.render('new', {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    })
    console.log(errors);
  } else {
    var newProject = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
    newProject.save(function(err) {
      if(err){
        return console.log("error when saving new project", err);
      }
      return res.redirect('/');
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  var totalContributions = 0;
  console.log('id', id);
  var project = Project.findById(id, function(err, project) {
    if(project){
      project.contributions.forEach(function(obj) {
        totalContributions = totalContributions + parseFloat(obj.amount);
      })
      var percentGoalReached = totalContributions/parseFloat(project.goal)*100;
      res.render('project', {
        id: id,
        title: project.title,
        goal: project.goal,
        description: project.description,
        start: project.start,
        end: project.end,
        totalContributions: totalContributions,
        percentGoalReached: percentGoalReached
      })
    }
  });
});

// Part 4: Contribute to a project
// Implement the POST /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  var totalByUser = 0;
  var totalContributions = 0;
  var project = Project.findById(id, function(err, project) {
    if(project){
      project.contributions.push({
        name: req.body.name,
        amount: req.body.amount
      })
      project.save(function(err){
        if(err){
          console.log("Something went wrong", err);
        } else {
          project.contributions.forEach(function(obj) {
            totalContributions = totalContributions + parseFloat(obj.amount);
            if(obj.name === req.body.name) {
              totalByUser = totalByUser + parseFloat(obj.amount);
            }
          })
          var percentGoalReached = (parseFloat(totalContributions/parseFloat(project.goal))*100);
          res.render('project', {
            id: id,
            title: project.title,
            goal: project.goal,
            description: project.description,
            start: project.start,
            end: project.end,
            totalByUser: totalByUser,
            totalContributions: totalContributions,
            percentGoalReached: percentGoalReached,
            contributions: project.contributions
          });
        }
      })
    }
  })
});

router.get('/project/:projectid/edit', function(req, res) {
  var id = req.params.projectid;
  var project = Project.findById(id, function(err, project) {
    if(project){
      res.render('editProject', {
        id: id,
        title: project.title,
        goal: project.goal,
        description: project.description,
        start: project.start,
        end: project.end,
      });
    }
  })
})




//custom validators
// app.use(validator({
//   customValidators: {
//     longerThanFive: function(value) {
//       return value.length>5;
//     }
//   }
// }))



// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
