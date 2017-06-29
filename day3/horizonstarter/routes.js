"use strict";

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('-');
};

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
  var sort = req.query.sort || 'title';
  var sortDirection = req.query.sortDirection || 'asc';
  var descending = (sortDirection === 'desc' || sortDirection === 'descending' || sortDirection === '-1');
  var sortObject = {};
  sortObject[sort] = sortDirection;
  if (sort === 'totalContributions') {
    Project.find(function(err, arr) {
      if (err) {
        console.log(err);
      } else {
        arr.forEach(function(proj) {
          sortArr.push(proj.toObject());
        });
        sortArr.forEach(function(proj) {
          var total = 0;
          proj.contributions.forEach(function(item) {
            total += item.amount;
          });
          proj.totalContributions = total;
        });
        sortArr.sort(function(a, b) {
          if (descending) {
            return b.totalContributions - a.totalContributions;
          } else {
            return a.totalContributions - b.totalContributions;
          }
        });
        res.render('index', {
          items: sortArr,
          descending: descending
        })
      }
    });
  } else {
    Project.find({}).sort(sortObject).exec(function(err, arr) {
      res.render('index', {
        items: arr,
        descending: descending
      });
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
  req.checkBody('title', 'Error: missing title.').notEmpty();
  req.checkBody('goal', 'Error: missing goal.').notEmpty();
  req.checkBody('start', 'Error: missing start date.').notEmpty();
  req.checkBody('end', 'Error: missing end date.').notEmpty();
  req.checkBody('category', 'Error: missing category.').notEmpty();

  if (req.validationErrors()) {
    console.log(req.validationErrors());
    res.render('new', {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      error: req.validationErrors()
    });
  } else {
    var newProj = new Project({
      title: req.body.title,
      category: req.body.category,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
    newProj.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, proj) {
    if (err) {
      res.send(err);
    } else {
      var total = 0;
      proj.contributions.forEach(function(item) {
        total += item.amount;
      });
      res.render('project', {
        project: proj,
        total: total,
        progress: Math.round((total / proj.goal) * 100)
      });
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, proj) {
    if (err) {
      res.send(err);
    } else {
      proj.contributions.push({
        name: req.body.name,
        amount: req.body.amount
      });
      proj.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/project/' + req.params.projectid);
        }
      });
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, proj) {
    if (err) {
      res.send(err);
    } else {
      res.render('editProject', {
        title: proj.title,
        goal: proj.goal,
        description: proj.description,
        start: proj.start.yyyymmdd(),
        end: proj.end.yyyymmdd(),
        helpers: {
          selected: function(category) {
            if (category === proj.category)
              return 'selected';
          }
        }
      });
    }
  });
});
// Create the POST /project/:projectid/edit endpoint

router.post('/project/:projectid/edit', function(req, res) {
  req.checkBody('title', 'Error: missing title.').notEmpty();
  req.checkBody('goal', 'Error: missing goal.').notEmpty();
  req.checkBody('start', 'Error: missing start date.').notEmpty();
  req.checkBody('end', 'Error: missing end date.').notEmpty();
  req.checkBody('category', 'Error: missing category.').notEmpty();

  if (req.validationErrors()) {
    console.log(req.validationErrors());
    res.render('editProject', {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      error: req.validationErrors()
    });
  } else {
    Project.findByIdAndUpdate(req.params.projectid, {
      title: req.body.title,
      category: req.body.category,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    }, function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/project/' + req.params.projectid);
      }
    });
  }
});

module.exports = router;
