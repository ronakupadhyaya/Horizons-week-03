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

function edit(arr){
  var temp =[];
  for(var i=0; i<arr.length; i++){
    temp[i] = arr[i].toObject();
  }

  //console.log(temp.length)
  for(var i = 0; i<temp.length; i++){
    var x = temp[i].contributions;
    var sum = 0;
    for(var j=0; j<x.length;j++){
      sum += x[j].amount;
    }
    //console.log(sum);
    temp[i]["total"] = sum;
    //console.log(temp[i]);
  }

  return temp;
}

function check(obj){
  return obj.total >= obj.goal;
}

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  // YOUR CODE HERE

  if (req.query.sort && req.query.sort !== 'contributions') {
    var sortObject = {};
    if(req.query.sortDirection === 'descending'){
      sortObject[req.query.sort] = -1;
    }
    else {
      sortObject[req.query.sort] = 1;
    }
    Project.find().sort(sortObject).exec(function(err, array) {
      // YOUR CODE HERE
      console.log(Boolean(req.query.status));
      if(Boolean(req.query.status)){
        var temp = edit(array);
        temp = temp.filter(check);
        console.log(temp);
        res.render('index', {items: temp});
      }
      else{
        res.render('index', {items: array});
      }
    });
  }
  else if(req.query.sort && req.query.sort === 'contributions'){
    Project.find(function(err, array) {

      var temp = edit(array);
      //console.log(temp);
      if(req.query.sortDirection === 'descending'){
        temp.sort(function(a,b){
          return b.total - a.total;
        });
      }
      else{
        temp.sort(function(a,b){
          return a.total - b.total;
        });
      }
      //console.log(temp);
      if(Boolean(req.query.status)){
        temp = temp.filter(check);
        console.log(temp);
      }
      res.render('index', {items: temp});
    });
  }
  else {
    Project.find(function(err, array){
      res.render('index', {items: array});
    });
  }
});

router.post('/sort', function(req, res){
  console.log(req.body);
  res.redirect(`/?sort=${req.body.sort}&sortDirection=${req.body.sortDirection}&status=${Boolean(req.body.status)}`)

});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render("new");
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  //console.info('Here');
  req.checkBody('title', 'Title must not be empty').notEmpty();
  req.checkBody('goal', 'Goal must not be empty').notEmpty();
  req.checkBody('goal', 'Goal must be an integer').isInt();
  req.checkBody('description', 'Description must not be empty').notEmpty()
  req.checkBody('start', 'Start date must not be empty').notEmpty();
  req.checkBody('start', 'Start date must be a date').isDate();
  req.checkBody('end', 'End date must not be empty').notEmpty();
  req.checkBody('end', 'End date must be a date').isDate();
  var errors = req.validationErrors();
  if (!errors){
    var temp = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
    temp.save(function(err, result){
      console.log(err, result);
      if(!err){
        res.redirect('/');
      }
    })
  } else {
    console.log(errors)
    res.render('new', {
      errors: errors
    })
  }

});







// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projectID = req.params.projectid;
  // var project = Project.findById(projectID, function(err, found){
  Project.findById(projectID, function(err, found){
    if(!err){
      var goal = found.goal;
      console.log("contributions", found.contributions)
      console.log("goal", goal);
      var sum = 0;
      for(var i = 0; i < found.contributions.length ; i++){
        sum += found.contributions[i].amount;
        // console.log("sum", sum);
      }
      var percentage = sum/goal;

      res.render('project',{
        project: found,
        projectID: projectID,
        contributions: found.contributions, sum: sum, percentage: percentage
      });
    }
    else {
      console.log(err);
    }
  });

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  req.checkBody('name', 'Name must not be empty').notEmpty();
  req.checkBody('amount', 'Amount must not be empty').notEmpty();
  req.checkBody('amount', 'Amount must be an integer').isInt();
  var errors = req.validationErrors();

  var projectID = req.params.projectid;

  Project.findById(projectID, function(err, found){
    if(!err){
      if (!errors){
        found.contributions.push({name: req.body.name, amount: req.body.amount});
        found.save(function(err, result){
          if(err){
            console.log(err);
          }
          else {
            // var goal = found.goal;
            // console.log("contributions", found.contributions.length, found.contributions)
            // console.log("goal", goal);
            // var sum=0;
            // for(var i=0;i<found.contributions.length;i++){
            //   sum += found.contributions[i].amount;
            //   console.log("sum", sum);
            // }
            // var percentage = sum/goal;
            // req.flash('error', 'my errors...')
            res.redirect('/project/'+projectID);
          }
        });

      } else {
        console.log(errors)

        res.render('project', {
          errors: errors,
          project: found,
          projectID: projectID
        })
      }
    }
    else{
      console.log(err);
    }
  });

});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res){
  var projectID = req.params.projectid;
  Project.findById(projectID, function(err, found){
    res.render('editProject', {
      project: found,
      start_date: found.start.toString(),
      end_date: found.end.toString()
    });
  });
});

router.post('/project/:projectid/edit', function(req, res){
  Project.findById(req.params.projectid, function (err, p) {
    p.title = req.body.title
    p.goal = req.body.goal
    p.description = req.body.description
    p.start = req.body.start
    p.end = req.body.end



    p.save(function(err){if(err){res.status(500).json(err);}
    res.redirect('/project/'+req.params.projectid)
  });

});
})


module.exports = router;
