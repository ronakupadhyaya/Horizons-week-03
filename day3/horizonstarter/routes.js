"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var _ = require('underscore');

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
  var filter = req.query.filter;
  if(filter){
    Project.find(function(err, all){
      if(err){
        console.log('Come on man what are you doing');
      } else {
        var arr = all.filter(function(item){
          if(filter==='fullyFunded'){
            return item.goal <= item.totalContributions;
          } else {
            return item.goal > item.totalContributions;
          }
        });
        res.render('index', {projects: arr});
      }
    });
  } else if(sort){
    var sortObject = {};
    sortObject[sort] = 1;
    if(sortDirection === 'descending'){
      sortObject[sort] = -1;
    }
    Project.find({}).sort(sortObject).exec(function(err, all){
      res.render('index', {projects: all});
    });
  } else {
    Project.find(function(err, all){
      res.render('index', {projects: all});
    });
  }
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  req.checkBody('title', 'You need a title').notEmpty();
  req.checkBody('goal', 'You need a goal').notEmpty();
  req.checkBody('start', 'You need a start date').notEmpty();
  req.checkBody('end', 'You need an end date').notEmpty();
  req.checkBody('category', 'You need a category').notEmpty();
  console.log('category', req.body.category);
  var project = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category,
    totalContributions: 0
  });

  var result = req.validationErrors();
  if(result){
    res.status(400).render('new', {
      project: project,
      errors: result
    });
  } else {
    project.save(function(err){
      if(err){
        console.log("There was an error saving", err);
      } else {
        res.redirect('/');
      }
    })
  }

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project){
    if(err){
      console.log('Error: Bad ID', err);
    } else {
      var total = 0;
      project.contributions.forEach(function(item){
        total += item.amount;
      });
      res.render('project', {project: project,
                             total: total,
                             percent: total/project.goal*100,
                             contributions: project.contributions});
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var projectId = req.params.projectid;
  Project.findById(projectId, function(err, project){
    if(err){
      console.log('Error: ', err);
    } else {
      var contribution = {name: req.body.name, amount: req.body.amount};
      project.contributions.push(contribution);
      project.totalContributions = project.totalContributions + contribution.amount;
      project.save(function(err){
        if(err){
          console.log("error");
        } else {
          res.redirect('/project/'+projectId);
        }
      });
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res){
  Project.findById(req.params.projectid, function(err, project){
    if(err){
      console.log('You are un idiota');
    } else {
      res.render('editProject', {project: project});
    }
  });
});

// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res){
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }, function(err){
    if(err){
      console.log('You happen to be an idiot');
    } else {
      res.redirect('/project/'+req.params.projectid);
    }
  })
});

router.post('/api/project/:projectId/contribution', function(req, res){
  Project.findById(req.params.projectId, function(err, project){
    if(err){
      console.log("No such file found");
    } else {
      var contribution ={name: req.body.name, amount: req.body.amount};
      project.totalContributions = project.totalContributions + contribution.amount;
      project.contributions.push(contribution);
      project.save(function(err){
        if(err){
          console.log('You are a loser');
        } else {
          res.json(contribution);
        }
      })
    }
  })
});

module.exports = router;
