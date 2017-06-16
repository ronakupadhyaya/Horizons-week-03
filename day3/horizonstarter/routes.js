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
// router.get('/', function(req, res) {
//   Project.find(function(err,array){
//     res.render('index',{
//       items: array
//     });
//   })
// });

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  var project = {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }
  if(!req.body.title || !req.body.goal || !req.body.start || !req.body.end){
    res.render('new', {
      project: project,
      error: "error: something is missing"
    })
  }
  else{
    var newProject = new Project(project);
    newProject.save(function(err){
      console.log(err)
      res.redirect('/')
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projectid = req.params.projectid
  Project.findById(projectid,function(err, foundProject){
    if(err){
      console.log('error is', err)
    }
    else{
      var sum = 0
      foundProject.contributions.forEach(function(x){
        sum += parseInt(x.amount)
      })
      var percentage = (sum/foundProject.goal)*100;
      res.render('project', {
        id: foundProject._id,
        title: foundProject.title,
        goal: foundProject.goal,
        description: foundProject.description,
        start: foundProject.start,
        end: foundProject.end,
        contributions: foundProject.contributions,
        sum: sum,
        percentage: percentage,
        category: foundProject.category
      })
    }
  })
});

// Part 4: Contribute to a project
// Implement the POST /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var projectid = req.params.projectid

  Project.findById(projectid,function(err, foundProject){
    foundProject.contributions.push({name: req.body.name, amount:req.body.amount})

    foundProject.save(function(){
      var sum = 0
      foundProject.contributions.forEach(function(x){
        sum += parseInt(x.amount)
      })
      var percentage = (sum/foundProject.goal)*100;

      res.render('project', {
        id: foundProject._id,
        title: foundProject.title,
        goal: foundProject.goal,
        description: foundProject.description,
        start: foundProject.start,
        end: foundProject.end,
        contributions: foundProject.contributions,
        sum: sum,
        percentage: percentage,
        category: foundProject.category
      })
    })
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit',function(req,res){
  var projectid = req.params.projectid;

  Project.findById(projectid,function(err,foundProject){
    var list_of_categories = [
      {name: 'Famous Muppet Frogs',selected: false},
      {name: 'Current Black Presidents',selected: false},
      {name: 'The Pen is Mightier',selected: false},
      {name: 'Famous Mothers',selected: false},
      {name: 'Drummers Named Ringo',selected: false},
      {name: '1-Letter Words',selected: false},
      {name: 'Months That Start With "Feb"',selected: false},
      {name: 'How Many Fingers Am I Holding Up',selected: false},
      {name: 'Potent Potables',selected: false}
    ]
    list_of_categories.forEach(function(category) {
      if (category.name === foundProject.category) {
        category.selected = true;
      }
    })
    res.render('editProject',{
      _id: foundProject._id,
      title: foundProject.title,
      goal: foundProject.goal,
      description: foundProject.description,
      start: foundProject.start,
      end: foundProject.end,
      list_of_categories: list_of_categories
    })
  })
})
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit',function(req,res){
  var projectid = req.params.projectid;
  var updProject = {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }

  Project.findByIdAndUpdate(projectid,updProject,function(err){
    res.render('project', {
      title: updProject.title,
      goal: updProject.goal,
      description: updProject.description,
      start: updProject.start,
      end: updProject.end,
      category: updProject.category
    })
  })
})

// Sort get parameters

router.get('/',function(req,res){
  var selectedSort = req.query.sort
  var sortDirection = req.query.sortdirection

  if(sortDirection === "descending"){
    if(selectedSort === "totalcontributions"){   // check if you want to sort by totalcontributions
      Project.find(function(err,items){
        items.sort(function(a,b){
        var sum= 0;
        var sum2= 0;
        a.contributions.forEach(function(m){sum += parseInt(m.amount)})
        b.contributions.forEach(function(n){sum2 += parseInt(n.amount)})
        console.log(sum, sum2)
        return sum - sum2;
          })
        res.render('index',{
          items: items,
          sort: selectedSort
        })
      })
    }
    else{
      Project.find().sort("-" + selectedSort).exec(function(err,items){
        res.render('index',{
          items: items,
          sort: selectedSort
        })
      })
    }
  }
  else {
    if(selectedSort === "totalcontributions"){
      Project.find(function(err,items){
        var sum;
        var sum2;
        items.sort(function(a,b){
        var aTotCont= a.contributions.forEach(function(m){sum += m.amount})
        var bTotCont= b.contributions.forEach(function(n){sum2 += n.amount})
            return bTotCont - aTotCont
          })
        res.render('index',{
          items: items,
          sort: selectedSort
        })
      })
    }
    else{
      Project.find().sort(selectedSort).exec(function(err,items){
        res.render('index',{
          items: items,
          sort: selectedSort
        })
      })}
    }
  });

  module.exports = router;
