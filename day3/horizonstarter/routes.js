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
  var sort = req.query.sort;
  var sortDirection = req.query.sortDirection;
  var fullyFunded = req.query.fullyFunded;
  if(sort){
    if(sort!=='totalContributions'){
      var sortObject = {};
      sortObject[sort] = 1;
      if(sortDirection === 'descending'){
        sortObject[sort] = -1;
      }

      Project.find().sort(sortObject).exec(function(err,projectArray){
        res.render('index', {projects: projectArray})
      })
    } else{
      Project.find(function(err, projectArray){
        function sortFunction(a, b){
          var aTotal = 0;
          var bTotal = 0;
          for(var i=0; i < a.contributions.length;i++){
            aTotal += a.contributions[i].amount;
          }
          for(var i =0; i< b.contributions.length; i++){
            bTotal += b.contributions[i].amount;
          }

          return aTotal - bTotal;
        }
        projectArray.sort(sortFunction);
        res.render('index', {projects: projectArray});
      })
    }

  } else{

    if(fullyFunded==='true'){
      Project.find(function(err, projectArray){
        projectArray = projectArray.filter(function(project){
          var total = 0;
          for(var i =0; i < project.contributions.length;i++){
            total += project.contributions[i].amount;
          }
          return total >= project.goal
        });
        res.render('index', {projects: projectArray});
      })
    }
    else if(fullyFunded ==='false'){
      console.log("HERE")
      Project.find(function(err, projectArray){
        projectArray = projectArray.filter(function(project){
          var total = 0;
          for(var i =0; i < project.contributions.length;i++){
            total += project.contributions[i].amount;
          }
          return total < project.goal;
        });
        res.render('index', {projects: projectArray});
      })

    }
    else{
      Project.find(function(err, projectArray){
        res.render('index', {projects: projectArray})
      })
    }

  }

});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new');
});


router.post('/new', function(req, res) {
  var newProject = new Project(req.body);

  newProject.save(function(err, result){
    if(err){
      console.log("ERR", err);
      res.render('new', {project: req.body});
    } else{
      console.log("WHAT");
      res.redirect('/');
    }
  })
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projectId = req.params.projectid;

  Project.findById(projectId, function(err, project){
    var total = 0;

    for(var i=0; i < project.contributions.length;i++){
      total += project.contributions[i].amount;
    }
    var percentage = total/project.goal * 100;
    res.render('project', {project: project, total: total, percentage: percentage});
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var projectId = req.params.projectid;
  Project.findById(projectId, function(err, project){
    if(err){
      console.log("Err", err);
    } else{
      project.contributions.push(req.body);
      project.save(function(err, project){
        if(err){
          console.log("Err2", err);
        } else{
          res.redirect('/project/' + project.id);
        }
      })
    }
  })
});

// Part 6: Edit project
router.get('/project/:projectid/edit', function(req, res){
  var projectId = req.params.projectid;
  Project.findById(projectId).lean().exec(function(err, project){
    if(err){
      console.log("Err", err);
    } else{

      project.start = project.start.toISOString().split('T')[0];
      project.end = project.end.toISOString().split('T')[0];
      console.log("project", project);
      res.render('editProject', {project: project});
    }
  })
})
router.post('/project/:projectid/edit', function(req, res){
  var projectId = req.params.projectid;
  console.log("REQ", req.body);
  Project.findByIdAndUpdate(projectId, req.body,function(err, project){
    res.redirect('/project/' + projectId);
  })
})
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
