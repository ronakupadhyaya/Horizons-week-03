"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var _ = require('underscore');

function totalCon(project) {
  project.total = 0;
  project.contributions.forEach(function(obj) {
    project.total += obj.amount;
  });
  return project
}
function percentRaise(project) {
  project.percent = ((project.total/project.goal)*100).toFixed(1);
  return project
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
//
// Exercise 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  if(!req.query.sort){
    Project.find(function(err, array) {
      if(err) console.log('Error');
       else {
         if (req.query.status === 'fullyFunded') {
           var projStat = array.filter(function(x){
             totalCon(x)
             percentRaise(x)
             return x.percent >= 100
           })
         res.render('index', {items: projStat})
       } else if (req.query.status === 'funding') {
         var projStat = array.filter(function(x){
           totalCon(x)
           percentRaise(x)
           return x.percent < 100
         })
       res.render('index', {items: projStat})
        }
       else{
        var projectview = array.map(totalCon);
        res.render('index', {items: projectview})}
      }
    })} else if(req.query.sort) {
      if(req.query.sort === 'totalContributions'){
        Project.find(function(err,array){
          if(err) console.log('Error');
          else {
            array.sort(function(a,b) {
              var sum1 = a.contributions.reduce(function(x,y){
                return x + y.amount
              }, 0)
              var sum2 = b.contributions.reduce(function(x,y){
                return x + y.amount
              },0)
              if(req.query.sortDirection === 'ascend') {
              return sum1 - sum2
            } else if(req.query.sortDirection === 'descend') {
              return sum2 - sum1
            }
          });
            var projectview = array.map(totalCon);
            res.render('index', {items: projectview});
          }
        })
      } else {
      var sortObject = {};
      if(!req.query.sortDirection || req.query.sortDirection === 'ascend') {
        sortObject[req.query.sort] = 1;
      } else if (req.query.sortDirection === 'descend'){
        sortObject[req.query.sort] = -1
      } Project.find().sort(sortObject).exec(function(err, array) {
        if(err) {
          throw 'Error'
        } else {
          var projectview = array.forEach(totalCon);
          res.render('index', {items: projectview})
        }
      })};
    }
  });

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new');
});

// Exercise 2: Create project
// Implement the POST /new endpoint
var expressValidator = require('express-validator');
router.use(expressValidator());

function validate(req) {
  req.checkBody('title', 'No Title').notEmpty();
  req.checkBody('goal', 'No Goal').isInt();
  req.checkBody('start', 'Invalid Start Date').notEmpty();
  req.checkBody('end', 'Invalid End Date').notEmpty();
}

router.post('/new', function(req, res) {
  validate(req)
  console.log(req.body)
  var errors = req.validationErrors();
  if(errors) {
    req.body.errors = errors
    res.render('new', req.body)
  } else {
    var newproj = new Project(req.body);
    console.log(req.body)
    console.log(newproj)
    newproj.save(function(err){
      if(err){
        console.log(err)
      } else{
        res.redirect('/')
      }
    })
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    totalCon(project);
    percentRaise(project);
    res.render('project', project)
  })
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    project.contributions.push(req.body)
    project.save(function(err) {
      if(err){
        console.log('Error')
      } else {
        res.redirect('/project/' + req.params.projectid)
        }
      }
    )
})
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
    Project.findById(req.params.projectid, function(err, project) {
      if(err){
        console.log('Error')
      } else {
        console.log(project)
        var newStart = toDateStr(project.start)
        var newEnd = toDateStr(project.end)
        res.render('editProject', {
          project: project,
          start: newStart,
          end: newEnd,
        })
    }
})
});
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res){
  Project.findByIdAndUpdate(req.params.projectid, {$set: req.body}, function(err){
    if(err) throw 'Error';
    res.redirect('/project/' + req.params.projectid)
  })
})



function pad(num) {
  var norm = Math.abs(Math.floor(num));
  return (norm < 10 ? '0' : '') + norm;
}
function toDateStr(date) {
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate() + 1);
}
module.exports = router;
