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
  Project.find(function(err, projects) {
    if(err) {
      res.status(400).show('Unable to find projects due to ' + err);
    } else {
      res.render('index', {
        projectList: projects
      });
    }
  });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  var title = req.body.title;
  var goal = req.body.goal;
  var description = req.body.description;
  var start = req.body.start;
  var end = req.body.end;
  if(!( title && goal && start && end)) {
    res.render('new', {
      project: {
        title,
        goal,
        description,
        start,
        end,
      },
      error: true
    });
  } else {
    var newProject = new Project({
      title,
      goal,
      description,
      start,
      end,
    });
    newProject.save(function(err) {
      if(err) {
        res.render('new', {
          project: {
            title,
            goal,
            description,
            start,
            end,
          },
          saveError: err
        });
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    if(err) {
      res.status(400).show('Unable to get project with id ' + id);
    } else {
      var sum;
      var goalPercent;
      if(project.contributions) {
        sum = 0;
        project.contributions.forEach(function(con) {
          sum += con.amount;
        });
        goalPercent = sum/project.goal;
      }
      res.render('project', {
        project: project,
        sum: sum,
        goalPercent: goalPercent,
      });
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var name = req.body.name;
  var amount = req.body.amount;
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    if(err) {
      res.status(400).show('Unable to access project with id ' + id);
    } else {
      if(isNaN(parseInt(amount))) { //user didn't type in a number
        res.render('project', {
          project: project,
          numError: true,
          name: name,
          amount: amount,
        });
      } else { //it is a number
        amount = parseInt(amount);
        var newContribution = {
          name,
          amount,
        };
        if(!project.contributions) { //contributions doesn't exist yet
          project.contributions = [newContribution];
        } else { //it does exist so push to the end
          project.contributions.push(newContribution);
        }
        // all work is done, save the new updated project
        project.save(function(err) {
          if(err) {
            res.show('Failed to save updated project for reason: ', err);
          } else {
            var sum = 0;
            project.contributions.forEach(function(con) {
              sum += con.amount;
            });
            var goalPercent = (sum/project.goal)*100;
            res.render('project', {
              project: project,
              sum: sum,
              goalPercent: goalPercent,
            })
          }
        });
      }
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
