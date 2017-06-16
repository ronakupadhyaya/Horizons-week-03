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
  var direction = req.query.sortDirection;
  if (req.query.sort) {
    var sortObject = {};
    if (parseInt(direction) === -1) {
      sortObject[req.query.sort] = -1
    } else {
      sortObject[req.query.sort] = 1;
    }
    Project.find().sort(sortObject).exec(function(err, array) {
      res.render('index', {
        array: array
      })
    });
  } else {
    Project.find(function(err, array) {
      res.render('index', {
        array: array
      })
    })
  }
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {
    enum: ['Famous Muppet Frogs',
      'Current Black Presidents',
      'The Pen is Mightier',
      'Famous Mothers',
      'Drummer Named Ringo',
      '1-Letter Words',
      'Months That Start With "Feb"',
      'How Many Fingers Am I Holding Up',
      'Potent Potables']
  });
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  console.log(req.body.category);

  if (!req.body.title || !req.body.goal ||
    !req.body.start || !req.body.end) {
    res.status(400).json('Error 400: one of the inputs is invalid');
  } else {
    var proj = new Project({
      title: req.body.title,
      goal: req.body.goal,
      body: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      totalContributions: 0,
      goalPercent: 0,
      category: req.body.category
    });
    proj.save(function(err, array) {
      if (err) {
        console.log('The project did not save', err);
      } else {
        res.redirect('/');
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    if (err) {
      console.log("Couldn't find id", err);
    } else {
      res.render('project', {
        project: project
      })
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    console.log(project);
    var con = {
      name: req.body.name,
      amount: req.body.amount
    };

    //console.log(project.totalContributions);
    project.totalContributions += parseInt(req.body.amount)
    project.contributions.push(con);
    project.goalPercent = (project.totalContributions / project.goal) * 100;

    project.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      };
    })
  })

});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    if (err) {
      console.log("Couldn't find id", err);
    } else {
      var allCategories = ['Famous Muppet Frogs',
        'Current Black Presidents',
        'The Pen is Mightier',
        'Famous Mothers',
        'Drummer Named Ringo',
        '1-Letter Words',
        'Months That Start With "Feb"',
        'How Many Fingers Am I Holding Up',
        'Potent Potables'
      ];
      var labelledCategories = []
      allCategories.forEach(function(category) {
        labelledCategories.push({
          name: category,
          selected: (project.category === category)
        })
      })
      res.render('editProject', {
        project: project,
        categories: labelledCategories
      })
    }
  })
})

router.post('/project/:projectid/edit', function(req, res) {
  var id = req.params.projectid;
  Project.findByIdAndUpdate(id, {
    title: req.body.title,
    goal: req.body.goal,
    body: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }, function(err) {
    if (err) {
      console.log("There was an error updating the project", err);
    } else {
      res.redirect('/');
    };
  })
});


router.post('/api/project/:projectid/contribution', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    if (error) {
      console.log("error, couldn't find id", error)
    } else {
      var cont = {
        name: req.body.name,
        amount: req.body.amount
      };
      //check to make sure it's over 0
      req.checkBody({
        'amount': {
          isFloat: {
            options: [{
              min: 0.01
            }]
          },
          errorMessage: 'Contributions must be greater than 0!'
        }
      });
      var error = req.validationErrors();
      console.log('errors are', error);
      if (error) {
        res.status(400).json(error);
      } else {
        project.totalContributions += parseInt(req.body.amount);
        project.contributions.push(cont);
        project.goalPercent = (project.totalContributions / project.goal) * 100;
        project.save(function(err) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.json(cont);
          }
        })
      }
    }
  })
})



module.exports = router;
