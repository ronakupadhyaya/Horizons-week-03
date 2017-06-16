"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var _ = require('underscore');

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
  if(req.query.full){
    if(req.query.full==="a"){
      Project.find(function(err,arr){
        var filteredArr = _.filter(arr,function(item){
          var total = 0
          item.contributions.forEach(function(money){
            total += parseInt(money.amount)
          })
          return total >= item.goal})
        res.render('index',{
          items:filteredArr
        })
      })
    }
    else if(req.query.full==="b"){
      Project.find(function(err,arr){
        var filteredArr = _.filter(arr,function(item){
          var total = 0
          item.contributions.forEach(function(money){
            total += parseInt(money.amount)
          })
          return total < item.goal})
        res.render('index',{
          items:filteredArr
        })
      })
    }
  }
  else{
  if(req.query.total){
    Project.find(function(err,arr){
      var sortedArr = _.sortBy(arr,function(item){
        var total = 0
        item.contributions.forEach(function(money){
          total += parseInt(money.amount)
        })
        return total})
      res.render('index',{
        items:sortedArr
      })
    })
  }
  else{
  var sortDirection = req.query.sortDirection
  if(req.query.sort && sortDirection){
    if(sortDirection=== "1" || sortDirection=== "ascending"){
      var sortObject = {};
      sortObject[req.query.sort] = 1;
      Project.find().sort(sortObject).exec(function(err, arr) {
        // YOUR CODE HERE
        res.render('index',{
          items: arr
        })
      });
    }
    else if(sortDirection=== "-1" || sortDirection=== "decending"){
      var sortObject = {};
      sortObject[req.query.sort] = -1;
      Project.find().sort(sortObject).exec(function(err, arr) {
        // YOUR CODE HERE
        res.render('index',{
          items: arr
        })
      });
    }
  }
  else{
    if (req.query.sort) {
      var sortObject = {};
      sortObject[req.query.sort] = 1;
      Project.find().sort(sortObject).exec(function(err, arr) {
        // YOUR CODE HERE
        res.render('index',{
          items: arr
        })
      });
    }
    else{
      Project.find(function(err,arr){
        res.render('index',{
          items:arr
        })
      })
    }
  }
}
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
  req.check('title','title cannot be empty').notEmpty();
  req.check('goal','goal must be int').notEmpty().isInt();
  req.check('description','description cannot be empty').notEmpty();
  req.check('start','start date cannot be empty').notEmpty();
  req.check('end','end date cannot be empty').notEmpty();
  req.check('category','category cannot be empty').notEmpty();
  var eArr = req.validationErrors()
  if(eArr){
    res.render('new',{
      errors: eArr
    })
  } else {
    var p = new Project({
      title: req.body.title,
      goal: parseInt(req.body.goal),
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    });
    p.save(function(err){
      if(err){
        res.send(err);
      }
      else{
        res.redirect('/')
      }
    })
  }

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid,function(err,p){
    if(err){
      res.send(err)
    }
    else{
      var total = 0
      p.contributions.forEach(function(item){
        total += parseInt(item.amount)
      })
      var progress = Math.floor(total/p.goal*100);
      res.render('project',{
        title: p.title,
        goal: p.goal,
        description: p.description,
        start: p.start,
        end: p.end,
        total: total,
        project_id: req.params.projectid,
        progress: progress,
        conArr: p.contributions,
        category: p.category
      })
    }
  })

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid,function(err,p){
    if(err){
      res.send(err)
    }
    else{
      p.contributions.push({name: req.body.name, amount: req.body.amount})
      p.save(function(err){
        if(err){
          res.send(err)
        }
        res.redirect('/project/'+req.params.projectid);
      })
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.get('/project/:projectid/edit',function(req,res){
  Project.findById(req.params.projectid,function(err,p){
    if(err){
      res.send(err);
    }
    else{
      var total = 0
      p.contributions.forEach(function(item){
        total += parseInt(item.amount)
      })
      var start = new Date(p.start).toISOString().substring(0,10);
      var end = new Date(p.end).toISOString().substring(0,10);
      res.render('editProject',{
        title:p.title,
        goal: p.goal,
        description: p.description,
        start: start,
        end: end,
        total: total,
        project_id: req.params.projectid,
        conArr: p.contributions,
        category: p.category
      })
    }
  })
});


router.post('/project/:projectid/edit',function(req,res){
  Project.findById(req.params.projectid, function(err,p){
    if(err){
      res.send(err)
    }
    else{
      Project.findByIdAndUpdate(req.params.projectid,{
        title: req.body.title,
        goal: req.body.goal,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        conArr: req.body.contributions,
        category: req.body.category
      },function(err){
        if(err){
          res.send(err)
        }
        else{
          res.redirect('/project/'+req.params.projectid)
        }
      }
    )
    }
  })
})

module.exports = router;
