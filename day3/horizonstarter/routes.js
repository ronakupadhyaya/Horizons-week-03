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
router.get('/', function(req, res) {
  // YOUR CODE HERE

  Project.find({}, function(err, array) {
    res.render('index', {items: array});
  });

});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new');
});

function validate(req) {

  req.checkBody('title', 'Must enter a title').notEmpty();
  req.checkBody('goal', 'Must enter a goal').notEmpty();
  req.checkBody('start', 'Must enter a start date').notEmpty();
  req.checkBody('start', 'Must enter a start date that is a date').isDate();
  req.checkBody('end', 'Must enter an end').notEmpty();
  req.checkBody('end', 'Must enter an end date that is a date').isDate();

}

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  console.log("Hello WOrld");
  console.log(req.body);


  validate(req);

  var errors = req.validationErrors();
  if (errors) {
    res.render('new', {errors: errors});
  } else {

    var newItem = new Project({title: req.body.title, goal: req.body.goal, description: req.body.description, start: req.body.start, end: req.body.end, contrSoFar: 0, category: req.body.category});

    newItem.save(function(err){

      if(err){
        console.log(err);
      } else{
        console.log('Project Item Saved');
        res.redirect('/');
      }
    }); 
  }

});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  
  var id = req.params.projectid;
  // console.log(req.params);

  Project.findById(id, function (err, proj) {

    console.log(proj);
    if(err){
      console.log(err);
    } else{

      res.render('project', {project: proj});
    }



  });


});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {

  Project.findById(req.params.projectid, function (err, proj) {

    if(err){
      console.log(err);
    } else{

      var obj = {name: req.body.name, amount: req.body.amount};

      if('contributions' in proj){
        proj['contributions'].push(obj);
      } else{
        proj['contributions'] = [];
        proj['contributions'].push(obj);
      }

      console.log("**************************************************************************");

      if('contributions' in proj){
        if(proj['contributions'].length > 0){

          console.log('Hit here^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
          proj['contrSoFar'] = proj['contributions'].map(function(contribution){
            return contribution.amount;
          }).reduce(function(a,b){
            return a + b;
          }, 0);
        }
      }

      proj['contrPercent'] = (proj['contrSoFar']/ proj['goal']) * 100;
      
      
      console.log(proj);

      proj.save(function(err){

        if(err){
          console.log(err);
        }else{
          console.log("Project saved.");
          res.redirect('/project/'+req.params.projectid);
        }

      });
      
    }

  });

  

});
// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
