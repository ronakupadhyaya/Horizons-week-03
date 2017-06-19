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
  Project.find(function(err, array){
    console.log(array);
    res.render('index', {
      items: array,

    })
  })
  // YOUR CODE HERE
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
req.checkBody('title', 'No title provided').notEmpty()
req.checkBody('goal', 'No goal provided').notEmpty();
req.checkBody('description', 'No description provided').notEmpty();
req.checkBody('start', 'No start provided').notEmpty();
req.checkBody('end', 'No end provided').notEmpty();
var errorsArray = req.validationErrors();

if(!errorsArray){
  console.log('working')
  var currentProject = new Project({
    title: req.body.title,
    goal: req.body.goal,
    start: req.body.start,
    end: req.body.end,
    description: req.body.description
  })
  currentProject.save(function(err){
    if(!err){
      console.log('This worked');
return res.redirect('/')

    }else{
      console.log(err)

    }
  })
}else{
  res.render('new', {
    errors: errorsArray,
  });
}

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE

  //console.log(req);
  //console.log(res)
Project.findById(req.params.projectid, function(err, project){
  console.log(req.params.projectid) //just project ID
  console.log(project) // undefined
  res.render('project', {
    projectId: req.params.projectid,
    project: project,
    start: project.start,
    end: project.end,
    contributions: project.contributions,

  })
});
//console.log(currentProject)
  //res.render('project',)



});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
var currentProject;
  Project.findById(req.params.projectid, function(err, project){
    if(err){
      console.log(err)
      res.send("There is an error")
    }else{

//console.log(currentProject);
req.checkBody('name', 'name cannot be empty').notEmpty();
req.checkBody('amount', 'ammount cannot be empty').notEmpty();
var errArray = req.validationErrors();
//console.log(errArray)
  res.render('project',{
    //projectid: req.params.projectid,
    projectId: req.params.projectid,
    project: project,
    start: project.start,
    end: project.end,
    contributions: project.contributions,
    errors: errArray,

  })
  if(!errArray){

    project.contributions.push({
      name: req.body.name,
      amount: req.body.amount,
    })
    project.save(function(err){
      console.log(err)
    })
  }

}
console.log(project)
  })


});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
