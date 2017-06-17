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
      Project.find({}).sort({goal: direction}).exec(function(err, array){
        if(err){
          console.log(err);
        } else {
          res.render('index.hbs', {items: array});
        }
      });
    } else if (filter === 'start') {
      Project.find({}).sort({start: direction}).exec(function(err, array){
        if(err){
          console.log(err);
        } else {
          res.render('index.hbs', {items: array});
        }
      });
    } else if (filter === 'end') {
      Project.find({}).sort({end: direction}).exec(function(err, array){
        if(err){
          console.log(err);
        } else {
          res.render('index.hbs', {items: array});
        }
      });
    } else if (filter === 'total'){
      Project.find({}).sort({total: direction}).exec(function(err, array){
        if(err){
          console.log(err);
        } else {
          res.render('index.hbs', {items: array});
        }
      });
    } else if (filter === 'funded'){
      var fund = [];
      Project.find({}, function(err, projects){
        projects.forEach(function(a){
          if(a.total >= a.goal){
            fund.push(a);
          }
        });
        res.render('index.hbs', {items: fund});
      });
    } else if (filter ==='notfunded'){
      var fund = [];
      Project.find({}, function(err, projects){
        projects.forEach(function(a){
          if(a.total < a.goal){
            fund.push(a);
          }
        });
        res.render('index.hbs', {items: fund});
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
  res.render('new.hbs');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  var proj = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category,
    contributions: [],
    total: 0
  });

  proj.save(function(err){
    if(err){
      console.log('Error: ', err);
    }
    else{
      res.redirect('/');
    }
  })
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, a){
    if(err){
      console.log(err);
    }
    else{
      var complete = a.total/a.goal * 100;
      res.render('project.hbs', {a: a, id: req.params.projectid, complete: complete});
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, a){
    if(err){
      console.log('Error', err);
    }
    else{
      a.total += parseInt(req.body.amount);
      a.contributions.push({name: req.body.name, amount: req.body.amount});
      a.save(function(err){
        if(err){
          console.log('E', err);
        }
        else{
          var complete = a.total/a.goal * 100;
          res.render('project.hbs', {a: a, id: id, complete: complete});
        }
      });
    }
  });
});



// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res){
  console.log('happened');
  var id = req.params.projectid;
  Project.findById(id, function(err, a){
    if(err){
      console.log(err);
    }
    else{
      res.render('editProject.hbs', {a: a, id: id});
    }
  });
});

router.post('/project/:projectid/edit', function(req, res){
  var id = req.params.projectid;
  Project.findById(id, function(err, a){
    if(err){
      console.log('wrong:', err);
    }
    else{
      var start = new Date(req.body.start);
      var end =new Date(req.body.end);
      Project.findByIdAndUpdate(id, {
        title: req.body.title,
        goal: req.body.goal,
        description: req.body.description,
        start: start,
        end: end,
        category: req.body.category,
        contributions: a.contributions,
        total: a.total
      }, function(err){
        if(err){
          console.log(err);
        }
        else {
          res.redirect('/project/'+req.params.projectid);
        }
      });
    }
  });
});

router.post('/api/project/:projectid/contribution', function(req, res){
  var id = req.params.projectid;
  Project.findById(id, function(err, a){
    if(err){
      console.log('Error', err);
    }
    else{
      a.total += parseInt(req.body.amount);

      a.contributions.push({name: req.body.name, amount: req.body.amount});
      a.save(function(err){
        if(err){
          console.log('E', err);
        }
        else{
          var complete = a.total/a.goal * 100;
          res.json({name: req.body.name, amount: req.body.amount});
        }
      });
    }
  });
});

module.exports = router;
