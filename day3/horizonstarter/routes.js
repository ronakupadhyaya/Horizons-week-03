"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
// var validator = require('express-validator');
// app.use(validator());

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
  if (req.query.sort === 'ascendingstart') {
      var sortObject = {};
      sortObject[req.query.sort] = 1;
      Project.find().sort('start').exec(function(err, array) {
      // YOUR CODE HERE
        console.log(array);
        res.render('index', {
          items: array
        })
      });
  }
  else if (req.query.sort === 'ascendingend') {
      var sortObject = {};
      sortObject[req.query.sort] = 1;
      Project.find().sort('end').exec(function(err, array) {
      // YOUR CODE HERE
        res.render('index', {
          items: array
        })
      });
  }
  else if (req.query.sort === 'goal') {
      var sortObject = {};
      sortObject[req.query.sort] = 1;
      Project.find().sort(sortObject).exec(function(err, array) {
      // YOUR CODE HERE
        res.render('index', {
          items: array
        })
      });
  }
  else {
    Project.find(function(error, projects) { //get all projects from MongoDB
      res.render('index', {
        items: projects
      });
    })
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
  //console.log(req.body);
  var startDate = new Date(req.body.start).toISOString().substring(0, 10);
  var endDate = new Date(req.body.end).toISOString().substring(0, 10);
  var proj = new Project ({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.desc,
    start: req.body.start,
    end: req.body.end,
    category: req.body.picked
  });
  console.log(proj);
  req.checkBody('title', "Title cannot be empty").notEmpty();
  req.checkBody('goal', "Goal cannot be empty").notEmpty();
  req.checkBody('start', "Start date cannot be empty").notEmpty();
  req.checkBody('end', "End date cannot be empty").notEmpty();
  var errors = req.validationErrors();
  //console.log(errors);
  if (errors.length > 0) {
    res.render('new', {
      errors: errors,
      project: proj,
      startDate: startDate,
      endDate: endDate,
      category: proj.category
    });
  }
  else {
    // res.render('new', {
    //   project: proj,
    //   startDate: startDate,
    //   endDate: endDate
    // });
    proj.save(function(err) {
      res.redirect('/');
      if (err) {
        console.log("Can't find project", err);
      }
      else {

        //mongoose.connection.close();
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, proj) {
    var tot = 0;
    for (var i = 0; i < proj.contributions.length; i++) {
      tot += proj.contributions[i].amount;
    }
    res.render('project', {
      project: proj,
      contributions: proj.contributions,
      total: tot,
      goal: proj.goal,
      percent: tot / proj.goal * 100
    });
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, proj) {
    proj.contributions.push({
      name: req.body.name,
      amount: req.body.amount
    });
    proj.save(function(err, pr) {
      if (err) {
        console.log("Can't find project", err);
      }
      else {
      }
    });
    res.redirect('/project/' + req.params.projectid);
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, proj) {
    var startDate = new Date(proj.start).toISOString().substring(0, 10);
    var endDate = new Date(proj.end).toISOString().substring(0, 10);
    console.log('start', proj.start);
    console.log('startDate', startDate);
    res.render('editProject', {
      project: proj,
      startDate: startDate,
      endDate: endDate,
      id: req.params.projectid
    });
  })
});

router.post('/project/:projectid/edit', function(req, res) {
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
  // YOUR CODE HERE
    goal: req.body.goal,
    description: req.body.desc,
    start: req.body.start,
    end: req.body.end,
    category: req.body.picked
  }, function(err) {
  // YOUR CODE HERE
  });
});

router.post('/api/project/:projectId/contribution', function(req, res) {
  Project.findById(req.params.projectId, function(err, proj) {
    if (err) {
      console.log('error', err);
      res.render(err);
    }
    console.log(proj);
    proj.contributions.push({
      name: req.body.name,
      amount: req.body.amount
    });
    proj.save(function(err, pr) {
      if (err) {
        console.log("Can't find project", err);
      }
      else {
        res.json({contributions: proj.contributions});
      }
    });
  });
});





module.exports = router;
