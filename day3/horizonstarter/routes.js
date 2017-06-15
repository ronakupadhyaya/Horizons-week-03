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
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('title', 'Title is empty').notEmpty()
  req.checkBody('goal', 'Goal is empty').notEmpty()
  req.checkBody('goal', 'Goal is not a number').isInt();
  req.checkBody('description', 'Description is empty').notEmpty()
  req.checkBody('start', 'Start date is empty').notEmpty()
  req.checkBody('end', 'End date is empty').notEmpty()
  var errors = req.validationErrors();
  if (errors){
    res.render('new', {
      errors:errors,
      newProject: req.body
    })
  } else {
    var newProject = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
    }).save( function(err){
      if(err){
        console.log(err)
      } else{
        res.redirect('/')
      }
    }
  );
}
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err,proj){
    if(err){
      console.log(err)
    } else{
      res.render('project', {
        project: proj
      })
    }
  });


});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  req.checkBody('name', 'Name is empty').notEmpty()
  req.checkBody('amount', 'Amount is empty').notEmpty()
  req.checkBody('amount', 'Amount is not a number').isInt();
  var errors = req.validationErrors();

  Project.findById(id, function(err,proj){


    proj.contributions.push({name: req.body.name, amount: req.body.amount})
    proj.save(function(err){
      console.log(proj.contributions);
      if(err){
        console.log(err)
        res.render('project', {
          errors:errors,
          project: proj
        })
      } else{

        res.render('project', {
          project: proj,
        })


      }
    })

  });


  // var id = req.params.projectid;
  // var project
  //
  // req.checkBody('name', 'Name is empty').notEmpty()
  // req.checkBody('amount', 'Amount is empty').notEmpty()
  // req.checkBody('amount', 'Amount is not a number').isInt();
  // var errors = req.validationErrors();
  // if (errors){
  //   res.render('project', {
  //     errors:errors,
  //     project: project,
  //   })
  // } else {
  //   Project.findById(id, function(err,proj){
  //     if(err){
  //       console.log(err)
  //     } else{
  //       proj.contributions.push({name:req.body.name, amount:req.body.amount})
  //     }
  //   });



  //   var newProject = new Project({
  //     title: req.body.title,
  //     goal: req.body.goal,
  //     description: req.body.description,
  //     start: req.body.start,
  //     end: req.body.end,
  //   }).save( function(err){
  //     if(err){
  //       console.log(err)
  //     } else{
  //       res.redirect('/')
  //     }
  //   }
  // );


});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
