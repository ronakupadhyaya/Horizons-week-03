"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

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
  Project.find(function(error, projects) {
    if (error) {
      console.log("Cant find any projects", error);
    } else {
      res.render('index', {
        Project: projects
      });
    }
  })
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
  var p = {
      title: req.body.title,
      goal:req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category2
  }
  // console.log("cat",req.body.category2);
  if (!p.title || !p.goal || !p.start || !p.end) {
    res.render('new', {
      p: p,
      error: "something is wrong lol"
  });
  } else {
  var newProject = new Project(p)
  newProject.save( function (error) {
    console.log('save', error);
    res.redirect('/');
  });

  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(error, project) {
    if (error) {
      res.send(error);
    } else {
      var percentage = project.contributions.length / project.goal * 100;
      console.log(project.contributions);
      var contributionNum = 0;
      project.contributions.forEach(function(contrib) {
        contributionNum += parseInt(contrib.amount);
      })
      res.render('project', {
        Project: project,
        start: strftime('%B %d, %Y', project.start),
        end: strftime('%B %d, %Y', project.end),
        percentage: percentage,
        contributionNum: contributionNum
      })
    }
  })
});


// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post(‘/project/:projectid’, function(req, res) {
  Project.findById(req.params.projectid,function(err,found){
    if (err) {
      console.log(err);
    } else {
      req.checkBody(‘name’,‘You need a name’).notEmpty();
      req.checkBody(‘amount’,‘You need a amount’).notEmpty();
      var result = req.validationErrors();
      if (result){
        console.log(‘your fields are not filled’);
      }else {
        var obj = {name:req.body.name,
                   amount:parseInt(req.body.amount)};
        found.contributions.push(obj);
        found.save({contributions: found.contributions}, function(err){
          console.log(‘save err’);
          res.redirect(‘/project/’ + found._id);
        });
      }
    }
  })
});


// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/projects/:projectid/edit', function(req,res) {
  Project.findById(req.params.projectid, function(error, project) {
    var startDate = new Date(project.start);
    var endDate = new Date(project.end);
    var startString = startDate.getFullYear() + "-" + ("0" + startDate.getMonth()).slice(-2) + "-" +("0" + (startDate.getDate()+1)).slice(-2);
      console.log(startString);
    var endString = endDate.getFullYear()  + "-" + ("0" + endDate.getMonth()).slice(-2) + "-" +("0" + (endDate.getDate()+1)).slice(-2);
      console.log(endString);
    if (error) {
      res.send(error);
    } else {
        res.render('editProject', {
          Project: project,
          start: startString,
          end: endString
        });
    }
  })
});

router.post('/projects/:projectid/edit', function(req,res) {
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }, function(error) {
      if (error) {
        res.send(error);
      } else {
        res.redirect('/')
      }
    });
  });

router.post('/api/project/:projectId/contribution', function(req,res) {
  Project.findById(req.params.projectId, function(error, project) {
    if (error) {
      res.send(error);
    } else {
      if (req.body.name !== "" && !isNaN(req.body.amount)) {
        var newObj = {name: req.body.name, amount: parseInt(req.body.amount)};
        //console.log(project.contributions);
        var contributionArray = project.contributions || [];
        contributionArray.push(newObj); //project.contributions.push(newObj)
        project.contributions = contributionArray;
        project.save({contributions: project.contributions}, function(error, savedObject) {
          //console.log(savedObject);
          res.json({contributions: project.contributions});
        })
      }
    }
  })
});

module.exports = router
