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

// Exercise 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) { //local
  Project.find(function(err,project){
    if(err){
      throw err
    }else{
      res.render('index.hbs',{name: project});
      }
  })
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
 res.render('new.hbs');
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  req.checkBody('goal')
  var newProj = req.body;
  var sendProject = new Project({
    title: newProj.title,
    goal: parseInt(newProj.goal),
    description: newProj.description,
    start: new Date(newProj.start),
    end: new Date(newProj.end),
    //category: newProj.category
  })
  sendProject.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.redirect('/')
    }
  });

});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid,function(err,project){
    if(err) throw err;
    else {
      var total=0
      var percent=0;
      project.contributions.forEach(function(item){
        total+=item.amount;
      });
      percent= total/project.goal*100;
      console.log(project.goal)
      console.log(total)
      console.log(percent)
      res.render('project', {project:project,total:total,percent:percent})
    }
  })
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, proj){
      proj.contributions.push({name:req.body.name, amount:req.body.amount});
      var total = 0;
      var percent=0;
      proj.contributions.forEach(function(item){
        total +=item.amount;
      })
      percent = total/proj.goal*100;
      proj.save(function(err) {
         if(err) {
         } else {
     res.render('project',{project:proj,total:total})
    //  res.render('project',{project:proj,total:total, percent:percent})
         }
       })
});
});
// if(err) throw error;


// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit',function(req,res){
  Project.findByID(req.params.projectid, function(err,project){
    res.render('editProject',{project:project);
  })
}

router.post('/project/:projectid/edit')
module.exports = router;
