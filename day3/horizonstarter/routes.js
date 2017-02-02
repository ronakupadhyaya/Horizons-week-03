"use strict";

// Routes, with inline controllers for each route.
var validate = require('express-validator');
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

// Exercise 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  // YOUR CODE HERE
  Project.find({}, function(err, arr){
    res.render('index',{arr:arr})
  })
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE

  res.render('new');
});


function validate(req) {
  req.checkBody('title', 'Invalid title').notEmpty();
  req.checkBody('goal', 'Invalid goal').notEmpty();

  req.checkBody('description', 'Invalid description').notEmpty();
  req.checkBody('start', 'Invalid startDate').notEmpty();
  req.checkBody('end', 'Invalid endDate').notEmpty();

}

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  console.log(req.body);
  validate(req);

  // Get errors from express-validator
  var errors = req.validationErrors();
  console.log("errors: ", errors);
  if (errors) {
    res.render('/new', {errors: errors});
  } else {
    // YOUR CODE HERE
    var proj = new Project({title: req.body.title,
                            goal: req.body.goal,
                            description: req.body.description,
                            start: new Date(req.body.start).toDateString(),
                            end: new Date(req.body.end).toDateString(),
                            category: req.body.category
                          });
    proj.save(function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("new project saved");
        res.redirect('/');
      }
    })

  }
});
// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, doc){
    if(err){
      console.log(err);
    }
    else{
      var totalCtr = 0;
      var contributors=[];
      doc.contributions.forEach(function(item){
        totalCtr+=item.amount;
        contributors.push(item);
      })
      var percent = (totalCtr/doc.goal)* 100;

      res.render('project',{title: doc.title,
                            goal: doc.goal,
                            desc: doc.description,
                            start: doc.start,
                            end: doc.end,
                            category: doc.category,
                            totalCtr: totalCtr,
                            percent: percent,
                            contributors: contributors});
    }

  })

});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, doc){
    if(err){
      console.log(err);
    }
    else{
      doc.contributions.push({name: req.body.name, amount:req.body.amount});
      doc.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Success: added contribution to a Project object in MongoDb');
          var totalCtr = 0;
          var contributors=[];
          doc.contributions.forEach(function(item){
            totalCtr+=item.amount;
            contributors.push(item);
          })
          var percent = (totalCtr/doc.goal)* 100;
          res.render('project', {title: doc.title,
                                goal: doc.goal,
                                desc: doc.description,
                                start: new Date(doc.start).UTC(),
                                end: new Date(doc.end).UTC(),
                                category: doc.category,
                                totalCtr: totalCtr,
                                percent: percent,
                                contributors: contributors});
        }
      });
    }

  })
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, doc){
    if(err){
      console.log(err);
    }
    else{
      // console.log("title",doc.title);
      console.log(doc.start);
      console.log('@@@@@@', (new Date(doc.start)).getMonth(), (doc.start).getDay(), (doc.start).getFullYear());
      var selectArray=[{sel:'Famous Muppet Frogs'}, {sel: 'Current Black Presidents'}, {sel:'The Pen Is Mightier'}, {sel: 'Famous Mothers'}, {sel: 'Drummers Named Ringo'}, {sel:'1-Letter Words'}, {sel:'Months That Start with \"Feb\"'}, {sel:'How Many Fingers Am I Holding Up'}, {sel:'Potent Potables'}];
      selectArray.forEach(function(item){
        if(doc.category === item.sel){
          item['cat']= " selected";
        }
        else {
          item['cat']=" ";
        }
      })

      res.render('editProject',{title: doc.title,
                            goal: doc.goal,
                            desc: doc.description,
                            start: doc.start,
                            end: doc.end,
                            selectArray: selectArray
                            });
    }

  })
});
module.exports = router;
