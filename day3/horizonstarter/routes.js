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
  //-1 -> descending
  //1 -> ascending

  if(req.query.sort){
    if(req.query.sort==='total'){
      Project.find(function(err, projects){
        console.log(projects);
        ras.render('index',{project:projects})
      })

    }else{
      var sortObj = {}
      sortObj[req.query.sort] = req.query.sortDirection==='down' ? -1 : 1;
      Project.find().sort(sortObj).exec(function(err, projects){
        res.render('index',{projects:projects}) 
      })
    }
  }
  else{
    Project.find(function(err, projects){
      res.render('index',{projects:projects})
    })
  }
  
  
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new',{})
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  //pretend I checked that fields are valid here
  var reqbodyKeyArray = Object.keys(req.body)
  reqbodyKeyArray.forEach(function(field){
  })

  //create new Project object
  console.log(req.body.category)
  var myProject = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category,
    })

  console.log("don't do this")

  myProject.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.redirect('/');
    }
  });
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err, project){
    var total =0
    for (var i = 0;i<project.contributions.length;i++){
      total = total + project.contributions[i].contributionAmount;;
    }
    var percentage = (total / project.goal) * 100
    var fill = percentage;
    if(percentage>100){
      fill = 100;
    }
    res.render('project',{
      project: project, 
      total:total,
      percentage: percentage,
      fill:fill
    })
  })

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projectid = req.params.projectid;

  Project.findById(projectid, function(err, project){
    var total =0
    for (var i = 0;i<project.contributions.length;i++){
      console.log(project.contributions[i])
      total = total + project.contributions[i].contributionAmount;
    }

    total = total + parseInt(req.body.contributionsAmount)
    console.log(total)
    var percentage = (total / project.goal) * 100
    var fill = percentage;
    if(percentage>100){
      fill = 100;
    }


    project.contributions.push({
      donor: req.body.contributionsName,
      contributionAmount: req.body.contributionsAmount
    });

    project.save(function(err){
      res.render('project',{
        project: project,
        contributions: project.contributions,
        total: total,
        percentage: percentage, 
        fill: fill
      })
    });
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req,res){
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err, project){
    console.log(project.category)


    var startDateString = project.start.toISOString().substring(0, 10);
    var endDateString = project.end.toISOString().substring(0,10);
    res.render('editProject', {
      projectid: projectid,
      project: project,
      startDateString: startDateString,
      endDateString: endDateString

    })
  })

})
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res){
  
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
}, function(err, project) {
  if(err) {
      res.status(500).json(err)

    } else {
      res.redirect('/')
    }
  // YOUR CODE HERE
});

})

module.exports = router;
