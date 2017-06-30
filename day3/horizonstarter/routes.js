"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var underscore = require('underscore');

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();

  return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('-');
}

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
  var sortDirection = req.query.sortDirection || 'ascending';
  var sort = req.query.sort || 'title';
  var descending = (sortDirection === 'desc' || sortDirection === 'descending' || sortDirection === '-1');
  var filtered = [];
  var shouldFilter = (req.query.filter || false);

  Project.find(function(err, array) {
    if (err)
      console.log(err);
    else {
      array.forEach(function(obj) {
        filtered.push(obj.toObject())
      })
      for (var k = 0; k < filtered.length; k++) {
        var total = 0;
        filtered[k].contributions.forEach(function(item) {
          total += item.amount;
        })
        filtered[k].totalContributions = total;
      }

      filtered = filtered.filter(function(proj) {
        return proj.totalContributions >= proj.goal;
      })
    }
  });

  console.log(shouldFilter, '************')
  console.log(filtered)

  if (sort === 'totalContributions') {
    var arr = [];
    Project.find(function(err, array) {
      if (err)
        console.log(err);
      else {
        array.forEach(function(obj) {
          arr.push(obj.toObject());
        })
        for (var k = 0; k < arr.length; k++) {
          var total = 0;
          arr[k].contributions.forEach(function(item) {
            total += item.amount;
          })
          arr[k].totalContributions = total;
        }
        arr.sort(function(a, b) {
          if (descending)
            return a.totalContributions < b.totalContributions;
          return a.totalContributions > b.totalContributions
        })
        res.render('index', {
          items: arr,
          descending: descending,
          filtered: filtered,
          shouldFilter: shouldFilter
        });
      }
    });
  } else {
    var sortObject = {};
    sortObject[sort] = sortDirection;
    Project.find().sort(sortObject).exec(function(err, arr) {
      res.render('index', {
        items: arr,
        descending: descending,
        filtered: filtered,
        shouldFilter: shouldFilter
      });
    });
  }
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {
    helpers: {
      shouldSelect: function(category) {
        if (req.body.category === category)
          return 'selected';
      }
    }
  });
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  req.checkBody('title', 'Error: missing a title').notEmpty();
  req.checkBody('goal', 'Error: missing a goal').notEmpty();
  req.checkBody('start', 'Error: missing a start date').notEmpty();
  req.checkBody('end', 'Error: missing an end date').notEmpty();
  req.checkBody('category', 'Error: missing a category').notEmpty();

  if (req.validationErrors()) {
    res.render('new', {
      title: req.body.title,
      category: req.body.category,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      helpers: {
        shouldSelect: function(category) {
          if (req.body.category === category)
            return 'selected';
        }
      },
      error: req.validationErrors()
    })
  } else {
    var tempProj = new Project({
      title: req.body.title,
      category: req.body.category,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    })

    tempProj.save(function(err) {
      if (err)
        console.log(err);
      else
        res.redirect('/')
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, proj) {
    if (err)
      res.send(err);
    else {
      var total = 0;

      proj.contributions.forEach(function(item) {
        total += item.amount;
      })

      res.render('project', {
        title: proj.title,
        category: proj.category,
        goal: proj.goal,
        description: proj.description,
        start: proj.start,
        end: proj.end,
        id: req.params.projectid,
        total: total,
        progress: Math.round(100 * total / proj.goal),
        contributions: proj.contributions
      });
    }
  })
});

// Part 4: Contribute to a project
// Implement the POST /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, proj) {
    if (err)
      res.send(err);
    else {
      proj.contributions.push({
        name: req.body.name,
        amount: req.body.amount
      })
      proj.save();
      res.redirect('/project/' + req.params.projectid)
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, proj) {
    if (err)
      res.send(err);
    else {

      res.render('editproject', {
        title: proj.title,
        category: proj.category,
        goal: proj.goal,
        description: proj.description,
        start: proj.start.yyyymmdd(),
        end: proj.end.yyyymmdd(),
        helpers: {
          shouldSelect: function(category) {
            if (proj.category === category)
              return 'selected';
          }
        }
      });
    }
  })
});

// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  req.checkBody('title', 'Error: missing a title').notEmpty();
  req.checkBody('goal', 'Error: missing a goal').notEmpty();
  req.checkBody('start', 'Error: missing a start date').notEmpty();
  req.checkBody('end', 'Error: missing an end date').notEmpty();
  req.checkBody('category', 'Error: missing a category').notEmpty();

  if (req.validationErrors()) {
    res.render('editproject', {
      title: req.body.title,
      category: req.body.category,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      helpers: {
        shouldSelect: function(category) {
          if (req.body.category === category)
            return 'selected';
        }
      },
      error: req.validationErrors()
    })
  } else {
    Project.findByIdAndUpdate(req.params.projectid, {
      title: req.body.title,
      category: req.body.category,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    }, function(err) {
      if (err)
        console.log(err);
      else
        res.redirect('/project/' + req.params.projectid)
    })
  }
});

module.exports = router;