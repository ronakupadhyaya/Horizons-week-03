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
  Project.find(function(err, array) {
  res.render('index', {items: array});
});
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render("new")
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  var post = new Project ({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.theRealCategory
  });
  post.save(function (error){
    if (!error){
      res.redirect("/");
    }
    else {
      res.status(500).json(error);
    }
  })
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project) {
    var sum = 0;
    project.contributions.forEach(function(element) {
      sum+=parseInt(element.amount);
    var percent = sum / project.goal * 100;
    })
    res.render("project", {
      myProject:project,
      percent: sum / project.goal * 100
    });
  });

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
   Project.findById(req.params.projectid,function(err, project){
     project.contributions.push({
       name:req.body.name,
       amount:req.body.amount
     })
     project.save(function(err) {
       console.log(err);
       res.redirect('/project/' + req.params.projectid)
     });

   });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function (req, res){
   Project.findById(req.params.projectid,function(err, project){
     res.render("editProject", {myProject:project});
   });
});

router.post("/api/project/:projectId/contribution", function(req, res){
  Project.findById(req.params.projectId, function(err, project){
    if (err){
      return err;
    }
    else{
      project.contributions.push({
        name:req.body.name,
        amount:req.body.amount
      })
      project.save(function(err) {
        console.log(err);
        res.json(project.contributions);
      });
    }
  });
})


module.exports = router;
