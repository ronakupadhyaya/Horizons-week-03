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
  console.log(process.env.MONGODB_URI);
  if (req.query.sort) {
    var dir = req.query.sortDirection || "ascending";

    var sortObj = {};
    sortObj[req.query.sort] = dir;
    Project.find().sort(sortObj).exec(function(err, arr) {
      res.render('index', {items: arr})
    })
  }

  Project.find(function(err, arr) {
    res.render('index', {items: arr})
  });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  console.log('REACHES GET NEW');
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  console.log('REACHES POST NEW');
  // var start = req.body.start.length() === 10 ? startDate : req.body.start.toISOString().substring(0, 10)
  // var end = req.body.end.length() === 10 ? endDate : req.body.start.toISOString().substring(0, 10)

  var proj = {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }

  var project = new Project(proj)
  project.save(function(err) {
    if (err) {
      console.log('reaches error');
      res.render('new', {
        missedField: true
      })
    } else  {
      console.log('reaches redirect');
      res.redirect('/')
    }
  })
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  console.log('REACHES GET PROJECT');
  var id=req.params.projectid;
  var proj = Project.findById(id, function(err, project) {
    var sum = 0;
    var pct = 0;
    (project.contributions).forEach(function(e){
      sum += parseInt(e["amount"]);
    });
    pct = Math.round(sum/project.goal*100);

    res.render('project', {
      project: project,
      total: sum,
      percentage: pct
    });
  });
});
// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var id=req.params.projectid;
  console.log('REACHES POST PROJECT');
  Project.findById(id, function(err, item){
    if(err){
      console.log(err);
    } else {
      if (req.body.name && req.body.amount) {
        var person = req.body.name;
        var amt = req.body.amount;
        var contrib = {name: person, amount: amt}
        item.contributions.push(contrib);

        item.save(function(err, proj) {
          if (err) {
            res.send('error')
          } else {
            res.redirect('/project/'+id)
          }
        });
      }
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  var id=req.params.projectid;
  var linkTo = '/project/'+id+'/edit';
  console.log('REACHES GET EDIT');

  Project.findById(id, function(err, item){
    if(err){
      res.send(err);
    } else {
      //var start = item.start.toISOString().substring(0, 10)
      //var end = item.end.toISOString().substring(0, 10)

      res.render('editProject', {
        title: item.title,
        goal: item.goal,
        description: item.description,
        start: item.start,
        end: item.end,
        category: item.category,
        id: id,
        linkTo: linkTo
      })
    }
  });
});
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  var id=req.params.projectid;
  var linkTo = '/project/'+id+'/edit';
  console.log('REACHES POST EDIT with project start: '+req.body.start);
  // var start = req.body.start.length === 10 ? req.body.start : req.body.start.toISOString().substring(0, 10)
  // var end = req.body.end.length === 10 ? req.body.end : req.body.start.toISOString().substring(0, 10)


  Project.findById(id, function(err, proj) {
    if(err){
      res.send("id: "+id+"error: "+err);
    } else {
      proj.title = req.body.title;
      proj.goal = req.body.goal;
      proj.description = req.body.description;
      proj.start = req.body.start;
      proj.end = req.body.end;
      proj.category = req.body.category;

      proj.save(function(err) {
        if (err) {
          console.log('reaches error');
          res.render('editProject', {
            missedField: true
          });
        } else  {
          console.log('reaches redirect');
          res.redirect('/project/'+id);
        }
      });
    }
  });
});

router.get('/sort', function(req, res) {
  var sortObj = {};
  var dir = (req.query.sortDirection === "ascending") ? 1 : -1;
  sortObj[req.query.sort] = dir;
  console.log(req.query+" "+sortObj);

  Project.find().sort(sortObj).exec(function(err, arr) {
    res.render('index', {items: arr})
  })
})
module.exports = router;
