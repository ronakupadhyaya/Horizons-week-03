"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var expressValidator = require('express-validator');

var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser({ extended: false }));



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
router.get('/', function(req, res) {
  // YOUR CODE HERE
  Project.find(function(err,title){
    res.render('index', {title: title})
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new',{
    title: "Create New Project"
  })
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE

  req.checkBody('title','Title is Missing').notEmpty();
  req.checkBody('goal', 'Goal must be integer').isInt();
  req.checkBody('start', 'Start date is required').notEmpty();
  // req.checkBody('start', 'Start date must be a date').isDate();
  req.checkBody('end', 'End date is required').notEmpty();
  // req.checkBody('end', 'End date must be a date').isDate();
  var error = req.validationErrors();
  if(error){
    console.log("bad")
    res.render('new',{
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    })
    //  res.render('new',{
    //   title: "hello",
    //   goal: 1,
    //   description: "hey",
    //   start: new Date(),
    //   end: new Date()
    // })
  }else{
    console.log('Form Filled In')
    var added = new Project({title: req.body.title, goal: req.body.goal, description: req.body.description, start: req.body.start, end: req.body.end, category: req.body.category})
    added.save(function(err){
      if(err){
        console.log('Cannot add new Project')
      }else{
        res.redirect('/')
      }
    })
  }

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  // var id = req.params.projectid
  Project.findById(req.params.projectid,function(err,project){
    if(err){
      console.log('No ID provided')
    }else{
      var id = req.params.projectid;
      console.log(id)
      function total(obj){
        return obj.contributions.reduce(function(a,b){
            return a+b.amount
        },0)
      }
      res.render('project',{

        Project: project,
        projectid: id,
        title: project.title,
        goal: project.goal,
        description: project.description,
        start: project.start,
        end: project.end,
        contributions: project.contributions,
        total: total(project),
        percent: total(project)/project.goal*100


      })
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid,function(err,project){
    if(err){
      console.log('No ID provided to post')

      }else{
        project.contributions.push({
            name: req.body.name,
            amount: req.body.amount
          })
        project.save(function(err){
          if(err){console.log('error')}
          else{res.redirect('/project/'+req.params.projectid)}
        })   
      };
    })
  });


// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit',function(req,res){
  Project.findById(req.params.projectid,function(err,project){
      if(err){
        console.log('ID was not provided')
      }else{
        res.render('editProject',{
          Project: project,
          projectid: req.params.projectid,
          title: project.title,
          goal: project.goal,
          description: project.description,
          start: project.start,
          end: project.end,
          contributions: project.contributions,
          category: project.category
        })
      }
  })
})

// Create the POST /project/:projectid/edit endpoint

router.post('/project/:projectid/edit',function(req,res){
  Project.findByIdAndUpdate(req.params.projectid,{
          projectid: req.params.projectid,
          title: req.body.title,
          goal: req.body.goal,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
          contributions: req.body.contributions,
          category: req.body.category
        },function(err){
        if(err){
          console.log('error!')
        }else{
          res.render('editProject',{
          projectid: req.params.projectid,
          title: req.body.title,
          goal: req.body.goal,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
          contributions: req.body.contributions,
          category: req.body.category
        })
        }
      })
    })


// Sort

app.get('/', function (req, res) {

  var content = data.read();
  // if (req.query.author){
  //   content = content.filter(function(post){
  //     return post.author===req.query.author
  //   });
  // }

  if (req.query.sort === "start") {
    var sortObject = {};
    sortObject[req.query.sort] = 1;
    Project.find().sort(sortObject).exec(function(err, array) {
      // YOUR CODE HERE
    });
  }

  if (req.query.order==='ascending'){
    content.sort(function(a,b) { return new Date(a.date) - new Date(b.date); })
  } else {
    content.sort(function(a,b) { return new Date(b.date) - new Date(a.date); })
  }

  res.render('posts', {
    // Pass `username` to the template from req.cookies.username
    // Pass `posts` to the template from data.read()
    // YOUR CODE HERE
    username: req.cookies.username,
    posts: content,
    author: req.query.author

  })
});

module.exports = router;
