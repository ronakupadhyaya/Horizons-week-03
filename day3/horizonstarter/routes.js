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
  Project.find(function(err, project_arr){

    if(err){
      console.log("ERROR IN GET /");
    }else{
      res.render('index', {
        project_arr: project_arr
      });
    }

  });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {

  if(req.body.title && req.body.goal && req.body.start && req.body.end){

    var my_post = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });

    my_post.save(function(err){
      if(err){
        console.log("ERROR SAVING");
      }else{
        console.log("POST SUCCESSFUL");
      }
    });
    res.redirect('/');
  }else{
    var title = (req.body.title) ? req.body.title : "Error: title required";
    var goal = (req.body.goal) ? req.body.goal : "Error: goal required";
    var start = (req.body.start) ? req.body.start : "Error: start required";
    var end = (req.body.end) ? req.body.end : "Error: end required";

    console.log("ERROR NOT COMPLETE");

    res.render('new', {
      title: title,
      goal: goal,
      description: req.body.description,
      start: start,
      end: end
    });

  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project){
    if(err){
      console.log("ERROR in GET /project/:projectid");
      res.sendStatus(404);
    }else{
      if(project){
        res.render('project', {
          project: project
        });
      }else{
        res.sendStatus(404);
      }
    }
  })
});

// Part 4: Contribute to a project
// Implement the POST /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // get id
  var id = req.params.projectid;

  console.log("id is", id);

  // find project document via id
  Project.findById(id, function(err, project){

    if(err){
      console.log("ERROR in POST /post/:projectid");
      res.sendStatus(404);
    }else{
      // if contributions exist
      if(project.contributions.length > 0){
        console.log("had previous contributions");
        project.contributions.push({name: req.body.name, amount: req.body.amount});
        project.totalAmount += parseInt(req.body.amount);
      }else{
        project.contributions = [{name: req.body.name, amount: req.body.amount}];
        project.totalAmount = parseInt(req.body.amount);
      }
      // get percentage
      project.percentage = Math.floor(project.totalAmount/project.goal * 100);

      project.save();

      res.redirect(`/project/${id}`);
    }
  });


});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
