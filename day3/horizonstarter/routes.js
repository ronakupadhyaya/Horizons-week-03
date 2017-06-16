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
router.get('/', function (req, res) {
  if (req.query.sort) {
    var sortObject = {};
    sortObject[req.query.sort] = 1;
    if (req.query.sortDirection === 'descending') {
      sortObject[req.query.sort] = -1;
    }
    Project.find().sort(sortObject).exec(function (err, projects) {
      if (err) {
        console.log("ERROR: " + err);
      }
      else {
        res.render('index', {
          projects: projects
        });
      }
    });
  }
  else {
    Project.find(function(err, projects) {
      if (err) {
        console.log("ERROR: " + err);
      }
      else {
        res.render('index', {
          projects: projects
        });
      }
    })
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
  // YOUR CODE HERE
  console.log(req.body.title);
  var newProj = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  });
  console.log("CATEGORY: " + newProj.category)
  newProj.save(function(err, project) {
    if(err) {
      res.redirect('/');
    }
    else{
      res.redirect('/');
    }
  });
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid; 
  Project.findById(id, function(err, proj) {
    var sum;
    if (!proj.contributions) {
      sum = 0;
    }
    else {
      sum = 0;
      proj.contributions.forEach(function(element) {
        sum += parseInt(element.amount);
      });
    }
    res.render('project', {
      project: proj,
      id: id,
      totalContributions: sum,
      percent: sum / proj.goal * 100,
      contributions: proj.contributions
    })
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, proj) {
    if (err) {
      console.log(err);
    }
    proj.contributions.push({
      name: req.body.name,
      amount: req.body.amount
    });
    proj.save(function (err) {
      if (err) {
        res.redirect('/');
      }
      else {
        res.redirect('/');
      }
    });
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  var id = req.params.projectid;
  console.log(id);
  Project.findById(id, function(err, proj) {
    if (err) {
      console.log(err);
    }
    console.log(proj);
    res.render('editProject', {
      project: proj,
      start: (proj.start.getMonth() + 1).toString + (proj.start.getDay()).toString + (proj.start.getFullYear()).toString,
      id: id,
    });
  })
})
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function (req, res) {
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }, function (err) {
    console.log(err);
    res.redirect('/project/' + req.params.projectid);
    });
})

router.post('/api/project/:projectid/contribution', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, proj) {
    if (err) {
      return new Error("FUCK!!!");
    }
    proj.contributions.push({
      name: req.body.name,
      amount: req.body.amount
    });
    proj.save(function (err) {
      if (err) {
        res.redirect('/');
      }
      else {
        res.json();
      }
    });
  });
})
module.exports = router;
