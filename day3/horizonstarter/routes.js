"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var validator = require('express-validator');

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

  if(req.query.filter) {
    var filter = req.query.filter;

    if (filter === "fully"){
      Project.find(function(err, projectArr){
        projectArr = projectArr.filter(function(item){
          return ((item.total / item.goal) >= 1);
        });
        res.render('index', {items: projectArr})
      });
    }
    else if (filter === "notfully"){
      Project.find(function(err, projectArr){
        projectArr = projectArr.filter(function(item){
          return ((item.total / item.goal) < 1);
        });
        res.render('index', {items:projectArr})
      })
    }


  }
  if (req.query.sort) {
    var sortObject = {};
    if(parseInt(req.query.sortDirection) === -1) {
      sortObject[req.query.sort] = -1;
      Project.find().sort(sortObject).exec(function(err, array) {
    // YOUR CODE HERE
        res.render('index', {items:array});
      });
    }
    else{
      sortObject[req.query.sort] = 1;
      Project.find().sort(sortObject).exec(function(err, array) {
    // YOUR CODE HERE
        res.render('index', {items:array});
      });
    }
  }
  else{
    Project.find(function(err, projectArr) {
      res.render('index', {items:projectArr});
    });
  }
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
  // var error = validator(req);
  var title = req.body.title;
  var goal = parseInt(req.body.goal);
  var description = req.body.description;
  var start = req.body.start;
  var end = req.body.end;

  if(!title || !goal || !start || !end){
    res.render("new", {
      title: title || "Title required",
      goal: goal || "Goal required",
      description: description
    });
  }

  else{
    console.log("success");
    var newProject = new Project({
      title: title,
      goal: goal,
      description: description,
      start: new Date(start),
      end: new Date(end),
      category: req.body.category,
      total: 0
    });

    newProject.save(function(error){
      if(!error) {
        res.redirect('/');
      }
      // mongoose.close.connection();
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projectid = req.params.projectid;

  Project.findById(projectid, function(err, foundProject){
    if(err) {
      console.log("There was an error finding the ID. Please try again")
    }
    else{

      var contributionArr = foundProject.contributions;

      var percentage = Math.round(foundProject.total / foundProject.goal * 100);

      res.render('project', {
        project: foundProject,
        percentage: percentage
      });
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projectid = req.params.projectid;

  Project.findById(projectid, function(err, foundProject){
    if(err) {
      console.log("Contribution error");
    }
    else{
      foundProject.contributions.push({name: req.body.name, amount: parseFloat(req.body.amount)});

      foundProject.save(function(error){
        if (error) {
          console.log("error making contribution");
        }
        else{
          console.log(foundProject.total);
          foundProject.total += parseFloat(req.body.amount);

          var percentage = Math.round(foundProject.total / foundProject.goal * 100);

          foundProject.save(function(error){
            if(error) {
              console.log("there was an error");
            }
            else{
              res.render('project', {
                project: foundProject,
                percentage: percentage,
              });
            }
          })
        }
      });
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
  router.get('/project/:projectid/edit', function(req, res){

    var projectid = req.params.projectid;

    Project.findById(projectid, function(err, foundProject){

      if(err) {
        console.log('error');
      }
      else{

        res.render('editProject', {
          project: foundProject
        });
      }
    });
  });
// Create the POST /project/:projectid/edit endpoint
  router.post('/project/:projectid/edit', function(req, res){

    var projectid = req.params.projectid;

    Project.findByIdAndUpdate(projectid,
    {
        title: req.body.title,
        goal: req.body.goal,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        category: req.body.category
    },

    function(error, foundProject){

      if(error){
        console.log("error updating, try again");
      }
      else{
        // res.render('project', {
        //   project: foundProject,
        // });
        res.redirect(`/project/${projectid}`);
      }
    });

  });

  router.post("/api/project/:projectId/contribution", function(req, res {
    var projectid = req.params.projectId;

    Project.findbyId(projectId, function(error, foundProject) {
      if (error) {
        console.log("There was an error finding project");
      }
      else{
        var contributionObj = {name: req.body.name, amount: parseFloat(req.body.amount)};
        foundProject.contributions.push(contributionObj);
        foundProject.save(function(error) {
          if(error) {
            console.log("Contribution error.", error)
          }
          else{
            res.json(contributionObj);
          }
        });
      }
    })
  });
  
module.exports = router;
