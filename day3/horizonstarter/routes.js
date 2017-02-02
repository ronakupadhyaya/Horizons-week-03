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

// Exercise 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  Project.find(function(err, arr){ //second thing is result
    if(err){
      console.log("there's an error");
    }
    console.log("success");
    res.render('index', {items: arr}); //should be callback object

  })
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {
  title: "Create new project",
  categories: Project.schema.path('category').enumValues.map(function (el) {
    return {val: el}
  })
});

// Exercise 2: Create project
// Implement the POST /new endpoint

function validate(req){
  req.checkBody('title', 'Invalid').notEmpty();
  req.checkBody('goal', 'Invalid').notEmpty();
  req.checkBody('description', 'Invalid').notEmpty();
  req.checkBody('start', 'Invalid').notEmpty();
  req.checkBody('end', 'Invalid').notEmpty();

}

router.post('/new', function(req, res) {
  validate(req);
  var errors = req.validationErrors();
  if (errors) {
    res.render('new', {data: req.body, categories: Project.schema.path('category').enumValues.map(function(chosen) {
      // This is messy, but we can't have logic in handlebars.
      return {val: chosen, selected: chosen===req.body.category};
    })
  });
  } else {
    // console.log(req.body.enumValues);
    // var category = Project.path('category').enumValues
    // console.log(category);

    var newProject = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
      category: req.body.category
    });
    newProject.save(function(err){
      console.log("save")
      if (err){
        res.render('new', {data: req.body, categories: Project.schema.path('category').enumValues.map(function(chosen) {
          // This is messy, but we can't have logic in handlebars.
          return {val: chosen, selected: chosen===req.body.category};
        }
      });
      }
      res.redirect('/');
    //  res.render('/', {data: newProject})
    })


    // res.render('new');
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // console.log("whee");
  Project.findById(req.params.projectid, function(err, project){
    console.log(req.params.projectid);
    console.log('123');
    if(err){
      console.log("error finding project", err)
    } else {
      console.log(project);
      res.render('project', {project:project}) //the key here could be anything, and should be used in the handlebars in project
    }
  })
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project){
    if(err){
      // console.log(this[project][contribution]);
      console.log("error finding project", err)
    } else {

      // var newContribution = req.body;
      var newContribution = {
        name: req.body.name,
        amount: req.body.contributions
      }
      project.contributions.push(newContribution);
      project.save(function(err){
        if (err){
          console.log(err)
        }

        var total = 0;
        project.contributions.forEach(function(item){
        total += item.amount;
      });

        var percent = total/project.goal*100
        if(percent> 100){
        percent = 100;
        }


        // var total = 0;
        // project.contributions.forEach(function(item){
        //   total += item.amount;
        // });
        //
        // var percent = total/project.goal * 100;
        // if(percent > 100){
        //   percent = 100;
        // }
        res.render('project', {project:project, total:total, percent:percent})
        //res.redirect('project', {project:project});
      })
      }
    })
  })

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
