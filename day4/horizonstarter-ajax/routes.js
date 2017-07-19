/* jshint node: true */
"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var Total = require('./models').Total;
var strftime = require('strftime');

router.post("/", function(req, res) {
  console.log("body", req.body);
  Project.find({}).sort(req.body.sortMethod).exec(function(err, projects) {
    if (err) {
      res.status(500).send("Couldn't find projects.");
    } else {
      console.log(projects);
      if (req.body.filterFunded === "viewFullyFunded") {
        projects = projects.filter(function(project) {
          return project.totalContributions >= project.goal;
        });
      }
      if (req.body.filterFunded === "viewNotFunded") {
        projects = projects.filter(function(project) {
          return project.totalContributions < project.goal;
        });
      }
      res.json({projects: projects});
    }
  });
});

router.get('/', function(req, res) {
  Project.find({}).sort("-start").exec(function(err, projects){
    if (err) {
      res.status(500).send("Couldn't find projects.");
    } else {
      res.render('index', {items: projects});
    }
  });
});

router.get('/new', function(req, res) {
  res.render("new");
});

router.post('/new', function(req, res) {
  console.log(req.body);
  req.checkBody('title', 'Title must not be empty').notEmpty();
  req.checkBody('goal', 'Goal must not be empty').notEmpty();
  req.checkBody('goal', 'Goal must be an integer').isInt();
  req.checkBody('description', 'Description must not be empty').notEmpty();
  req.checkBody('start', 'Start date must not be empty').notEmpty();
  req.checkBody('start', 'Start date must be a date').isDate();
  req.checkBody('end', 'End date must not be empty').notEmpty();
  req.checkBody('end', 'End date must be a date').isDate();
  req.checkBody('category', 'Category must be selected').notEmpty();
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
      category: req.body.category,
      totalContributions: 0,
      percentFunded: 0
    });
    newProject.save(function(err, result){
      if (err){
        res.status(500).send("Could not save project to databse");
      } else {
        res.redirect('/');
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projectID = req.params.projectid;
  Project.findById(projectID, function(err, project){
    if(err) {
      res.status(500).send("Project not in database");
    } else {
      var percentage = Math.round((project.totalContributions / project.goal) * 100);
      res.render('project', {
        project: project,
        projectID: projectID,
        contributions: project.contributions,
        sum: project.totalContributions,
        percentage: percentage
      });
    }
  });
});



router.post('/api/project/:projectId/contribution', function(req, res) {
  var projectID = req.params.projectId;
  req.checkBody('name', 'Name must not be empty').notEmpty();
  req.checkBody('amount', 'Amount must not be empty').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.json({errors: errors});
  } else {
    Project.findById(projectID, function(err, project){
      if (err){
        res.status(500).send("Project not in database.");
      } else {
        project.contributions.push({name: req.body.name, amount: req.body.amount});
        project.totalContributions = ~~+project.totalContributions + ~~+req.body.amount;
        var percentage = Math.round((project.totalContributions / project.goal) * 100);
        project.percentFunded = percentage;
        project.save(function(error, result) {
          if (error){
            res.status(500).send("Project could not be saved.");
          } else {
            res.json({
              name: req.body.name,
              amount: req.body.amount,
              totalContributions: project.totalContributions,
              percentage: percentage
            });
          }
        });
      }
    });
  }
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res){
  var projectID = req.params.projectid;
  Project.findById(projectID, function(err, found){
    res.render('editProject', {
      project: found,
      start_date: found.start,
      end_date: found.end
    });
  });
});

router.post('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    project.title = req.body.title;
    project.goal = req.body.goal;
    project.description = req.body.description;
    project.start = req.body.start;
    project.end = req.body.end;
    project.save(function(err, res) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.redirect('/project/' + req.params.projectid);
      }
    });
  });
});


module.exports = router;
