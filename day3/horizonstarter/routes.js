"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
router.get('/create-test-project', function (req, res) {
  var project = new Project({
    title: 'I am a test project'
  });
  project.save(function (err) {
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
  Project.find(function (err, arr) {
    if (err) {
      res.send('Find Error', err);
    } else {
      if (req.query.sort || req.query.sortDirection) {
        var sortObj = {};
        sortObj[req.query.sort || 'start'] = req.query.sortDirection || 1;
        Project.find().sort(sortObj).exec(function (err, sortedArr) {
          if (err) {
            res.send('Sort Error', sortedArr);
          } else {
            if (req.query.filter) {
              if (req.query.filter === 'finished') {
                sortedArr = sortedArr.filter(function (a) {
                  return a.goal < a.raised;
                });
              } else {
                sortedArr = sortedArr.filter(function (a) {
                  return a.goal > a.raised;
                });
              }
            }
            res.render('index', {
              items: sortedArr,
              sort: req.query.sort,
              sortDirection: req.query.sortDirection,
              funded: req.query.funded,
              filter: req.query.filter,
            });
          }
        });
      }
      else {
        res.render('index', {
          items: arr,
          sort: req.query.sort,
          sortDirection: req.query.sortDirection,
          funded: req.query.funded,
          filter: req.query.filter,
        });
      }
    }
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function (req, res) {
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function (req, res) {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('goal', 'Goal is required and must be Int').notEmpty().isInt();
  req.checkBody('start', 'Start is required').notEmpty();
  req.checkBody('end', 'End is required').notEmpty();
  req.checkBody('category', 'Category is required' + req.body.category).notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.render('new', {
      error: errors,
      title: req.body.title,
      goal: req.body.goal,
      start: req.body.start,
      end: req.body.end,
      description: req.body.description,
      category: req.body.category,
    })
  } else {
    var project = new Project({
      title: req.body.title,
      description: req.body.description,
      goal: req.body.goal,
      start: req.body.start,
      end: req.body.end,
      raised: 0,
      category: req.body.category,
    });
    project.save(function (err) {
      if (err) {
        console.log("Save Error", err)
      }
      else {
        console.log("Save Success");
        res.redirect('/');
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function (req, res) {
  Project.findById(req.params.projectid, function (err, doc) {
    if (err) {
      console.log('Find Error', err);
    } else {
      res.render('project', {
        title: doc.title,
        goal: doc.goal,
        description: doc.description,
        start: doc.start,
        end: doc.end,
        contribution: doc.contribution,
        number: doc.contribution.length,
        percent: (doc.raised / doc.goal * 100),
        id: req.params.projectid,
        category: doc.category,
      });
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function (req, res) {
  Project.findById(req.params.projectid, function (err, doc) {
    if (err) {
      console.log('Find Error', err);
    } else {
      req.checkBody('name', 'Name is required').notEmpty();
      req.checkBody('amount', 'Award required and must be number').notEmpty().isInt();
      var errors = req.validationErrors();
      if (!errors) {
        doc.contribution.push({ 'name': req.body.name, 'amount': req.body.amount });
        console.log(doc);
        doc.raised = parseInt(req.body.amount) + parseInt(doc.raised);
        doc.save();
        res.redirect('/project/' + req.params.projectid);
      }
    }
  });
});

// Part 6: Edit project
router.get('/project/:projectid/edit', function (req, res) {
  Project.findById(req.params.projectid, function (err, doc) {
    if (err) {
      console.log('Find Error', err);
    } else {
      var enumArr = doc.schema.path('category').enumValues;
      var enumObj = [];
      enumArr.forEach(function (elem) {
        enumObj.push({ name: elem, selected: doc.category === elem });
      });
      var start = doc.start.toISOString().substring(0, 10);
      var end = doc.end.toISOString().substring(0, 10);
      res.render('editProject', {
        title: doc.title,
        goal: doc.goal,
        description: doc.description,
        start: start,
        end: end,
        id: req.params.projectid,
        category: enumObj,
      });
    }
  });
});
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function (req, res) {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('goal', 'Goal is required and must be Int').notEmpty().isInt();
  req.checkBody('start', 'Start is required').notEmpty();
  req.checkBody('end', 'End is required').notEmpty();
  req.checkBody('category', 'Category is required' + req.body.category).notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.redirect("/project/" + req.params.projectid + "/edit")
  } else {
    Project.findByIdAndUpdate(req.params.projectid, {
      title: req.body.title,
      goal: req.body.goal,
      start: req.body.start,
      end: req.body.end,
      description: req.body.description,
      category: req.body.category,
    }, function (err) {
      if (err) {
        console.log('Find Error', err);
      } else {
        res.redirect('/project/' + req.params.projectid);
      }
    });
  }
});

router.post('/project/:projectid/contribution', function (req, res) {
  Project.findById(req.params.projectid, function (err, doc) {
    if (err) {
      console.log('Find Error', err);
    } else {
      req.checkBody('name', 'Name is required').notEmpty();
      req.checkBody('amount', 'Award required and must be number').notEmpty().isInt();
      var errors = req.validationErrors();
      if (!errors) {
        var contObj = { 'name': req.body.name, 'amount': req.body.amount };
        doc.contribution.push(contObj);
        console.log(doc);
        doc.raised = parseInt(req.body.amount) + parseInt(doc.raised);
        doc.save();
        res.json(contObj);
      }
    }
  });
});

module.exports = router;
