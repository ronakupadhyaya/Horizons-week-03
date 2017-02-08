"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var _= require('underscore');

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
  // YOUR CODE
  console.log("--");
  console.log(req.query.sort);
  if(req.query.sort && req.query.sort!=="totalContributions"){
    var sortObject = {};
    console.log(req.query.sort);

    sortObject[req.query.sort] = 1;
    console.log(sortObject);
    Project.find({}).sort(sortObject).exec(function(err, array) {
      res.render('index',{
        items: array
      });
    });
  } else if (req.query.sort === "totalContributions") {
    Project.find(function(err, array){
      var totalContributionsArr = [];
      var retTotalContribution;
      totalContributionsArr = _.map(array, function(element){
          retTotalContribution = 0;
          element.contributions.forEach(function(item){
          retTotalContribution += item.amount;
        })
        return retTotalContribution;
      })

      var sortArray = []
      array.forEach(function(element){
        var objectToPush = {project: element};
        objectToPush.contribution = retTotalContribution[array.indexOf(element)];
        sortArray.push(objectToPush);
      })
      var sortedArray = sortArray.sort(function(a,b){
        return a.contribution-b.contribution;
      })
      var retArray = [];
      sortedArray.forEach(function(element){
        retArray.push(element.project)
      })
      res.render('index', {
        items: retArray
      });

    })







  } else {
    Project.find(function(err, array){
      res.render('index',{
        items: array
      })
    })
  }
});


// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new')
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  var product = new Project(req.body)
  console.log("hello");
  console.log(req.body);


  product.save(function(err){
    if(err){
      res.render('new', {
        error: err,
        message: "Error",
        product: product
      })
    } else {
      res.redirect('/');
    }
  })
  //.render('new')
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project){
    res.render('project', {
      project: project
    })
  });
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projectId = req.params.projectid;
  var name = req.body.name;
  var amount = req.body.amount;
  Project.findById(projectId, function(err, foundProject){
    var contribution = {name: name , amount: amount}
    foundProject.contributions.push(contribution)
    foundProject.save(function(err){
      if(err){
        res.render('project', {
          error: err,
          message: "Error",
          project: foundProject,
          contribution: contribution
        })
      } else {
        res.redirect('/project/'+req.params.projectid)
      }
    })
  })
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/projects/:projectid/edit', function(req,res){
  Project.findById(req.params.projectid, function(err, product){
    res.render('editProject', {
      product: product
    })
  })
})

router.post('/projects/:projectid/edit', function(req,res){
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    // YOUR CODE HERE
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end
  }, function(err) {
    // YOUR CODE HERE
    if(err){
      res.redirect('/projects/:'+req.params.projectid+'/edit/')
    } else {
      res.redirect('/');
    }
  });
})




module.exports = router;
