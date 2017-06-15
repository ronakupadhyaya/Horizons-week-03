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
  Project.find(function(err, found) {
    if (err) {
      console.log('Error: ', err);
    } else {
      var fund;
      if (req.query.funded) {
        if (req.query.funded === 'Funded') {
          fund = found.filter(function(item) {
            return item.total >= item.goal;
          });
        } else {
          fund = found.filter(function(item) {
            return item.total < item.goal;
          });
        }
      }
      fund = (fund || found);
      if (req.query.sortDirection) {
        if (req.query.sort === 'start') {
          if (req.query.sortDirection === 'Ascending') {
            fund.sort(function(a, b) {
              return a.start - b.start;
            });
          } else {
            fund.sort(function(a, b) {
              return b.start - a.start;
            });
          }
        } else if (req.query.sort === 'end') {
          if (req.query.sortDirection === 'Ascending') {
            fund.sort(function(a, b) {
              return a.end - b.end;
            });
          } else {
            fund.sort(function(a, b) {
              return b.end - a.end;
            });
          }
        } else if (req.query.sort === 'goal') {
          //goal
          if (req.query.sortDirection === 'Ascending') {
            fund.sort(function(a, b) {
              return a.goal - b.goal;
            });
          } else {
            fund.sort(function(a, b) {
              return b.goal - a.goal;
            });
          }
        } else {
          if (req.query.sortDirection === 'Ascending') {
            fund.sort(function(a, b) {
              return a.total - b.total;
            });
          } else {
            fund.sort(function(a, b) {
              return b.total - a.total;
            });
          }
        }
      }
      res.render('index', {items: fund});
    }
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new', {enum: Project.schema.paths.category.enumValues});
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.check('title', 'title field is required').notEmpty();
  req.check('goal', 'goal field is required').notEmpty();
  req.check('goal', 'goal needs to be an int').isInt();
  req.check('start', 'start field is required').notEmpty();
  req.check('end', 'end field is required').notEmpty();

  var errors = req.validationErrors();
  if (errors.length > 0) {
    var obj = {};
    for (var i = 0; i < errors.length; i++) {
      obj[errors[i].param] = errors[i].msg;
    }
    obj.enum = Project.schema.paths.category.enumValues;
    res.render('new', obj);
  } else {
    console.log('image', req.body.image);
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category,
      image: req.body.image
    });
    project.save(function(err) {
      if (err) {
        console.log('Error: ', err);
      } else {
        res.redirect('/');
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log(found);
      res.render('project', found);
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log("Error: ", err);
    } else {
      req.check('contributorName', 'contributor name is required').notEmpty();
      req.check('amount', 'amount is required').notEmpty();
      req.check('amount', 'amount should be greater than 0').gt(0);

      var errors = req.validationErrors();
      if (errors.length > 0) {
        for (var i = 0; i < errors.length; i++) {
          found[errors[i].param] = errors[i].msg;
        }
      } else {
        found['contributorName'] = '';
        found['amount'] = '';
        var obj = {
          name: req.body.contributorName,
          amount: req.body.amount
        };

        found.contributions.push(obj);
        var total = found.contributions.reduce(function(a, b) {
          if (isNaN(parseInt(b.amount))) {
            b.amount = 0;
          }
          return a + parseInt(b.amount);
        }, 0);
        found.percent = total / found.goal * 100;
        found.total = total;
        found.save(function(err) {
          if (err) {
            console.log("Error: ", err);
          } else {
            res.redirect('/project/' + req.params.projectid);
          }
        });
      }
    }
  })
});

router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log("Error: ", err);
    } else {
      var myEnum = Project.schema.paths.category.enumValues;
      var startValue = found.start && found.start.toISOString().substring(0, 10);
      var endValue = found.end && found.end.toISOString().substring(0, 10);
      //date can dissapear, how to set default date?
      res.render('editProject', {found: found, enum: myEnum, startValue: startValue, endValue: endValue});
    }
  });
})

router.post('/project/:projectid/edit', function(req, res) {
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category,
    image: req.body.image
  }, function(err) {
    console.log('Error: ', err);
  });
  res.redirect('/project/' + req.params.projectid);
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
