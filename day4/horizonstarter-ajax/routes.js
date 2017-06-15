"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var expressValidator = require('express-validator');
var util = require('util');
var bodyParser = require('body-parser');
var underscore = require('underscore')

var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

var app = express();
app.use(bodyParser.json());
app.use(expressValidator());

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
//sort=end&sortDirection=ascending
router.get('/', function(req, res) {
  // YOUR CODE HERE
  if (!req.query.sort && !req.query.filter) {
    Project.find(function(err,task) {
      res.render('index',{
        projects: task
      });
    });
  } else if (req.query.sort){
    if (req.query.sortDirection) {
      var sortObject = {};
      sortObject[req.query.sort] = req.query.sortDirection;
      if (req.query.sort === 'contribution') {
        var allObj = [];
        Project.find(function(err,obj) {
          allObj = obj;
          var sortedObj = underscore.sortBy(allObj,function(proj){
            var totalCon = 0;
            proj.contributions.forEach(function(obj) {
              totalCon+=obj.amount;
            });
            return totalCon;
          });
          if (req.query.sortDirection === 'descending') {
            sortedObj = sortedObj.reverse();
          }
          res.render('index',{
            projects:sortedObj
          });
        });
      } else {
        Project.find({}).sort(sortObject).exec(function(err, array) {
          res.render('index',{
            projects: array
          });
        });
      }
    }
  } else if (req.query.filter) {
    var allObj = [];
    Project.find(function(err,obj) {
      allObj = obj;
      var afterFilt = underscore.filter(allObj,function(proj) {
        var totalCon = 0;
        proj.contributions.forEach(function(obj) {
          totalCon+=obj.amount;
        });
        if (req.query.filter === 'fully') {
          return totalCon/proj.goal >= 1;
        } else {
          return totalCon/proj.goal < 1;
        }
      })
      res.render('index', {
        projects: afterFilt
      })
    })
  }
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.check('title', 'Title field cannot be empty').notEmpty();
  req.check('goal', 'Goal field cannot be empty').notEmpty();
  req.check('goal', 'Goal has to be an integer').isInt();
  req.check('description', 'Description field cannot be empty').notEmpty();
  req.check('startDate', 'Invalid startDate').notEmpty();
  req.check('endDate', 'Invalid endDate').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.status(400);
    res.render('new', {errors:errors})
  } else {
    var newProject = new Project({
        title:req.body.title,
        goal:req.body.goal,
        description:req.body.description,
        start:req.body.startDate,
        end:req.body.endDate,
        category:req.body.category
      });
    newProject.save(function(err) {
      if(err) {
        res.render('new',{
          project:newProject
        })
      } else {
        res.redirect('/');
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, found) {
    if (err) {
      res.send(err);
    } else {
      var contriNum = 0;
      found.contributions.forEach(function(contri) {
        contriNum += parseInt(contri.amount);
      })
      var percentage = contriNum/found.goal*100;
      res.render('project', {
        project: found,
        start: strftime('%B %d, %Y', found.start),
        end: strftime('%B %d, %Y', found.end),
        category:found.category,
        percentage: percentage,
        contriNum:contriNum,
        id:id
      });
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id,function(err,found) {
    if (err) {
      res.send(err);
    } else {
      if (req.body.name !== "" && !isNaN(req.body.amount)) {
        var newObj = {name:req.body.name,amount: parseInt(req.body.amount)};
        var c = found.contributions || [];
        c.push(newObj)
        found.contributions = c;
        found.update({contributions:found.contributions},function(err,savedObject) {
          res.redirect('/project/'+id)
        })
      }
    }
  })
});

router.get('/project/:projectid/edit',function(req,res) {
  var editId = req.params.projectid;
  Project.findById(editId,function(err,found) {
    if (err){
      res.send(err);
    } else {
      var category = [];
      var cate = ['Famous Muppet Frogs',
      'Current Black Presidents',
      'The Pen Is Mightier',
      'Famous Mothers',
      'Drummers Named Ringo',
      '1-Letter Words',
      'Months That Start With "Feb"',
      'How Many Fingers Am I Holding Up',
      'Potent Potables'];
      for (var i=0; i<cate.length;i++) {
        var newOpt = {};
        newOpt.name = cate[i];
        if (found.category === newOpt.name) {
          newOpt.selected = true;
        } else {
          newOpt.selected = false;
        }
        category.push(newOpt)
      }
      var stadate = new Date(found.start);
      var enddate = new Date(found.end);
      res.render('editProject',{
        project:found,
        start: stadate.toISOString().slice(0,10).replace(/-/g,"-"),
        end: enddate.toISOString().slice(0,10).replace(/-/g,"-"),
        categories:category
      });
    }
  })
})

router.post('/project/:projectid/edit',function(req,res) {
  var editId = req.params.projectid;
  Project.findByIdAndUpdate(editId,{
      title:req.body.title,
      goal:req.body.goal,
      description:req.body.description,
      start:req.body.startDate,
      end:req.body.endDate,
      category:req.body.category
    }, function(err) {
      if (err){
        res.send(err);
      } else {
        res.redirect('/')
      }
    });
});

router.post('/api/project/:projectId/contribution',function(req,res) {
  var id = req.params.projectId;
  Project.findById(id,function(err,proj) {
    if (err){
      res.status(400);
    } else {
      req.check('amount','The amount must be positive').isInt({min:1})
      var errors = req.validationErrors();
      if (errors) {
        res.status(400).json(errors);
      }
      if (req.body.name !== "" && !isNaN(req.body.amount)) {
        var newObj = {name:req.body.name,amount: parseInt(req.body.amount)};
        var c = proj.contributions || [];
        c.push(newObj)
        proj.contributions = c;
        proj.update({contributions:proj.contributions},function(err,savedObject) {
          res.json(newObj);
        });
      }
    }
  });
});

module.exports = router;
