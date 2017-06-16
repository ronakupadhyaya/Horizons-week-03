"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models')
  .Project;
var strftime = require('strftime');

// Body Parser to use req.body
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());

// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({
    title: 'I am a test project'
  });
  project.save(function(err) {
    if (err) {
      res.status(500)
        .json(err);
    } else {
      res.send('Success: created a Project object in MongoDb');
    }
  });
});

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  if (req.query.sort) {
    var sortObject = {};
    var sortDirection = req.query.sortDirection;
    sortObject[req.query.sort] = sortDirection;
    Project.find()
      .sort(sortObject)
      .exec(function(err, array) {
        if (err) {
          console.log("error", err);
        } else {
          console.log("success");
          res.render('index', {
            item: array,
          });
        }
      });
  } else {
    Project.find(function(err, array) {
      if (err) {
        console.log("Error", err);
      } else {
        res.render('index', {
          item: array
        });
      }
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
  req.check('title', 'Title is required')
    .notEmpty();
  req.check('category', 'Category')
    .notEmpty();
  req.check('goal', 'Goal is required')
    .notEmpty();
  req.check('start', 'Start date is required')
    .notEmpty();
  req.check('end', 'End date is required')
    .notEmpty();

  var error = req.validationErrors();

  if (error) {
    res.render('new', {
      title: req.body.title,
      category: req.body.category,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      error: error
    });
  } else {
    var newProj = new Project({
      title: req.body.title,
      goal: req.body.goal,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category,
      description: req.body.description
    });
    newProj.save(function(err) {
      if (err) {
        console.log("Could not save", err);
      } else {
        console.log("Success");
        res.redirect('/')
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projectId = req.params.projectid;
  Project.findById(projectId, function(err, project) {
    var contributionArray = project.contributions;
    // calculate total of all contributiors
    var total = 0;
    var percentBar = 0;
    contributionArray.forEach(function(contributor) {
      total += contributor.amount * 1;
    });
    // calcuate % of goal
    var percentOfGoal = (total / project.goal) * 100;

    if (percentOfGoal >= 100) {
      percentBar = 100;
    } else {
      percentBar = percentOfGoal;
    }
    res.render('project', {
      project: project,
      total: total,
      percentOfGoal: percentOfGoal,
      percentBar: percentBar
    });
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var projectId = req.params.projectid;
  Project.findById(projectId, function(err, project) {
    project.contributions.push({
      contributor: req.body.contributor,
      amount: req.body.amount
    });
    project.save(function(err) {
      if (err) {
        console.log("Could not save", err);
      } else {
        console.log("Success");
        res.redirect('/project/' + projectId)
      }
    });
  });
});

//   var projectId = req.params.projectid;
//   Project.findById(projectId, function(err, project) {
//     project.contributions.push({
//       name: req.body.name,
//       amount: req.body.amount
//     });
//   });
//   console.log("project contributions", project.contributions);
//   Project.save(function(err) {
//     if (err) {
//       console.log("Could not save", err);
//     } else {
//       console.log("Success");
//     }
//   });
// });

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  var projectId = req.params.projectid;
  Project.findById(projectId, function(err, project) {
    var start = project.start.toISOString()
      .split("T")[0];
    var end = project.end.toISOString()
      .split("T")[0];
    // console.log(date);
    res.render('editProject', {
      project: project,
      start: start,
      end: end
    });
  });
});

router.post('/project/:projectid/edit', function(req, res) {
  var projectId = req.params.projectid;
  Project.findByIdAndUpdate(projectId, {
    title: req.body.title,
    goal: req.body.goal,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category,
    description: req.body.description
  }, function(err) {
    if (err) {
      console.log("Could not edit", err);
    } else {
      console.log("success");
      res.redirect('/project/' + projectId);
    }
  });
});


router.post('/api/project/:projectId/contribution', function(req, res) {
  var projectId = req.params.projectId;
  Project.findById(projectId, function(err, project) {
    project.contributions.push({
      contributor: req.body.contributor,
      amount: req.body.amount
    });
    project.save(function(err) {
      if (err) {
        console.log("Could not save", err);
      } else {
        console.log("Success");
        res.json({
          contributor: req.body.contributor,
          amount: req.body.amount
        });
      }
    });
  });
});

module.exports = router;
