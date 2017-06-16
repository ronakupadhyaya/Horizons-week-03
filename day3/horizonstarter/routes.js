"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
// router.get('/create-test-project', function(req, res) {
//   var project = new Project({
//     title: 'I am a test project'
//   });
//   project.save(function(err) {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.send('Success: created a Project object in MongoDb');
//     }
//   });
// });

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  Project.find(function(err, array) {
  //console.log(array);
  res.render('index', {objArray: array});
  });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new') ///format may be wrong for part 2 subsection 3
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  var newPost = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    total: req.body.total,
    category: req.body.categories
  })
  newPost.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.redirect("/");
    }
  });

});

  // var expressValidator = require('express-validator')
  // if(expressValidator) {
  //
  // }


// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var storedId = req.params.projectid
  console.log(storedId);
  Project.findById(storedId, function(err, result){
    res.render('project', {
      project:result,
      projectId: storedId
    });
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  console.log(req);
var projectId = req.params.projectid;
  Project.findById(projectId, function(err, project){
    if(err){
      console.log("shoot");
    } else {
      var projObj = {
      contributorName: req.body.contributionName,
      contributionAmount: req.body.contributionAmount
      }
    }
    project.contributions.push(projObj);
    project.total = parseInt(project.total) || 0;
    project.total += parseInt(req.body.contributionAmount);
    var complete = project.total / project.goal *100;
    console.log(complete);
    project.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.render("project", {
          project: project,
          projectId: projectId,
          complete: complete
        })
      }
  });


});
});


// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res){
  var storedId = req.params.projectid
  Project.findById(storedId, function(err, project){
    res.render('edit', {
      project:project,
      projectId: storedId
    });
  });



})


  //
  // Project.findByIdAndUpdate(req.params.projectid, editProject, function(err, editProject) {
  //   if(err){
  //     console.log(err);
  //   } else{
  //     res.render("edit", {
  //       editProject: editProject
  //     })
  //   }
  // });






module.exports = router;
