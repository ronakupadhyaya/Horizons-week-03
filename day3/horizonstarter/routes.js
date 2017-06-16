"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

var bodyParser = require('body-parser');

var validator = require('express-validator');
router.use(validator());

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
  var sort = req.query.sort;
  var sortDirection = req.query.sortDirection || "ascending";
  //console.log( sort , sortDirection);

  if (sort === "funded"){
    Project.find(function(err, array){
      if (err){
        console.log(err);
      }
      else{
        array = array.filter(function(project){
          return (project.contributions.reduce(function(acc, val){
            return acc + val.amount;
          },0))/project.goal > 1;
        })
      }
      console.log(array)
      res.render('index', {
        items: array
      })
    })
  }

  else if (sort === "unfunded"){
    Project.find(function(err, array){
      if (err){
        console.log(err);
      }
      else{
        array = array.filter(function(project){
          return (project.contributions.reduce(function(acc, val){
            return acc + val.amount;
          },0))/project.goal < 1;
        })
      }
      console.log(array)
      res.render('index', {
        items: array
      })
    })
  }

  else if (sort === "contributions") {
    Project.find(function(err, array){
      if (err){
        console.log(err);
      }
      else{
        array.sort(function( a, b){
          return (a.contributions.reduce(function(acc, val){
            return acc + val.amount;
          },0)) - (b.contributions.reduce(function(acc, val){
            return acc + val.amount;
          },0))
        })

        if (sortDirection === "descending") {
          array = array.reverse();
        }
        //need to sort array by sum of contributions before render
        res.render('index', {
          items: array
        })
      }
    })
  }
  else if (sort){
    var sortObject= {};
    sortObject[req.query.sort] = req.query.sortDirection
    Project.find().sort(sortObject).exec(function(err, array){
      res.render('index', {
        items: array
      })
    })
  } else {
    Project.find(function(err, array){
      res.render('index', {items: array});
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
  var newProject = new Project({
    title: req.body.title,
    goal:req.body.goal,
    description:req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  });
  newProject.save(function(err){
    if (err){
      res.render('new', {
        project:newProject
      })
    }
    else{
      // dont do anything.
      res.redirect('/');
    }
  });
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, project){
    if (err){
      console.log(err);
    }
    else{

      var sum = project.contributions.reduce(function(a,b){
        return a+ b.amount
      },0)
      var percent = sum/project.goal;
      res.render('project', {
        project: project,
        sum : sum,
        percent: percent
      });
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE

  var id = req.params.projectid;

  var newContribution = new Object({
    name: req.body.name,
    amount: req.body.amount
  })

  Project.findById(id, function(err, project){
    if (err){
      console.log(err);
    }
    else{
      project.contributions.push(newContribution);
      project.save(function(err){
        if (err){
          res.render('new', {
            project:project
          })
        }
        else{
          res.redirect('/project/'+id);
        }
      })
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, project){
    if (err){
      console.log(err);
    }
    else{
      var startdate = new Date(project.start);
      var enddate = new Date(project.end);
      res.render('editProject', {
        project: project,
        start: startdate.toISOString().slice(0,10).replace(/-/g,"-"),
        end: enddate.toISOString().slice(0,10).replace(/-/g,"-")
      });
    }
  })
});
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findByIdAndUpdate(id, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start:  req.body.start,
    end: req.body.end,
    category: req.body.category
  }, function(err){
    if (err){
      console.log(err)
    }
    else{
      res.redirect('/')
    }
  });
});

router.post('/api/project/:projectId/contribution', function(req, res){
  var id = req.params.projectId;

  Project.findById(id, function(err, project){
    if (err){
      console.log(err);
    }
    else{
      router.use(expressValidator({
        customValidators: {
          isPos: function(value){
            return value >= 0;
          }
        }
      }))
      req.check('amount', 'amount has to be positive').isPos()

      var error = req.validationError();
      if (error){
        console.log('validation FAIL!!!');
      }
      else {
        var newContribution = {
          name: req.body.name,
          amount: req.body.amount
        }
        project.contributions.push(newContribution);

        project.save(function(err) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.json(project)
          }
        });
      }
    }
  });
});



module.exports = router;
