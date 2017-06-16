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
  // YOUR CODE HERE
  var filter = req.query.sort;
  var sortDir = req.query.sortDirection;
  var direction = 1;
  if (sortDir === 'descending') {
    direction = -1;
  }

  if (filter){
    if (filter === 'goal') {
      Project.find().sort({goal: direction}).exec(function(err, array){
        if(err){
          console.log(err);
        } else {
          res.render('index.hbs', {items: array});
        }
      });
    } else if (filter === 'start') {
      Project.find().sort({start: direction}).exec(function(err, array){
        if(err){
          console.log(err);
        } else {
          res.render('index.hbs', {items: array});
        }
      });
    } else if (filter === 'end') {
      Project.find().sort({end: direction}).exec(function(err, array){
        if(err){
          console.log(err);
        } else {
          res.render('index.hbs', {items: array});
        }
      });
    } else if (filter === 'totalContribution') {
      Project.find().sort({total: direction}).exec(function(err, array){
        if(err){
          console.log(err);
        } else {
          res.render('index.hbs', {items: array});
        }
      });
    } else if (filter === 'fullyfunded') {
      Project.find({funded: true}).sort({percent: direction}).exec(function(err, array){

      });
    }
  } else {
    Project.find(function(err, array){
      res.render('index.hbs', {items: array});
    });
  }

});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new.hbs');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.check('title', 'Missing title').notEmpty();
  req.check('goal', 'Invalid goal').notEmpty().isNumeric();
  req.check('start', 'Invalid date entry').isBefore();
  req.check('end', 'Invalid end date').isAfter(req.body.start);
  req.check('category2', 'Please select a category').notEmpty();

  var errors = req.validationErrors();
  if (errors){
    res.render('new', {
      projtitle: req.body.title,
      projgoal: req.body.goal,
      projdescription: req.body.description,
      projstart: req.body.start,
      projend: req.body.end,
    });
    console.log('Missing something!', errors);
    // console.log(req.body.category2);
  } else {
    var newProj = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category2,
      total: 0,
      funded: false
    });
    newProj.save(function(err){
      if(err){
        console.log('error:', err);
      } else {
        console.log('Gucci');
      }
    });
    // console.log(newProj);
    res.redirect('/');
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, found){
    res.render('project.hbs', {
      found: found,
      manyContribs: found.contributions.length,
      id: id,
      projPercent: found.percent,
      total: found.total
    });
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var project = req.params.projectid;
  Project.findById(project, function(err, found){
    var tot = found.total || 0;
    console.log(tot);
    var contrib = {name: req.body.nameContrib, amount: req.body.amountContrib};
    found.contributions.push(contrib);
    for (var i = 0; i < found.contributions.length; i++) {
      tot += +(found.contributions[i].amount);
    };
    if (tot === 0){
      res.render('project.hbs', {
        found: found,
        id: project,
        total: found.total,
        projPercent: found.percent
      });
      console.log('No contributions made');
    } else {

      var projectGoal = parseFloat(found.goal);
      var projPercent = parseInt((tot/projectGoal)*100);
      found.total = tot;
      found.percent = projPercent;
      if (projPercent >= 100){
        found.funded = true;
      }

      found.save(function(err){
        if(err){
          console.log("nope", err);
        } else {
          res.render('project.hbs',{
            found: found,
            projPercent: found.percent,
            total: found.total,
            manyContribs: found.contributions.length,
            contributions: found.contributions,
            id: project
          });
        }
      });
    }
    // var totals = found.contributions;
    //
    // var sum = 0;
    // totals.push(contrib);
    // // var totalContrib = found.contributions.forEach.reduce(function(a, b){return a+b}, 0);
    // totals.forEach(function(item){
    //   sum += item.amount;
    // });
    // console.log(totals);
  });

});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res){
  var thisProj = req.params.projectid;
  Project.findById(thisProj, function(err, projproj){
    if (err){
      console.log(`Couldn't find the project with this ID`);
    } else {
      res.render('editProject.hbs', {
        project: projproj,
        projID: thisProj
      });
    }
  });
});

// Create the POST /project/:projectid/edit endpoint

router.post('/project/:projectid/edit', function(req, res){
  var thisProj = req.params.projectid;
  Project.findByIdAndUpdate(thisProj, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.categoryz
  }, function(error){
    if (error){
      console.log("error: " + error);
    } else {
      res.redirect(`/project/${thisProj}`);
    }
  });

});

module.exports = router;
