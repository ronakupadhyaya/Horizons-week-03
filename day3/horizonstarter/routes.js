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
  Project.find(function(err, array) {
    res.render('index', {items: array});
  })
});

// app.get('/:name/:num', function(req, res) {
//   var myName = req.params.name;
//   var myNum = req.params.num;
//   var arr = [];
//   for (var i=0; i<myNum; i++) {
//     arr.push(myName)
//   }
//   res.render('myView', {name: myName, num: myNum})
// })
// app.listen(3000);

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new');
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  var product = new Project(req.body);
  product.save(function (err) {
    if (err) {
      console.log(err);
      res.render('new', {
        error:err,
        message: "Error",
        product:product
      })
    }else{
      res.redirect('/')
    }

  })
  console.log(product)

});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log('This is an error!')
    }
    res.render('project', {
      project: project
    })
  })
//then render project.hbs with this Project
//You can find projectid under req.params
res.render('project', user)
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.body);
  var y = req.params.projectid;
  var x = project.contributions.push(Project);
  Project.save(x);
  res.redirect('/project/y');

  // 1. look for the project with projectid.
  // 2. push the contibution that comes from the body into project.contributons array
  // 3. save the project
  // 4. redirect /project/req.params.projectid
})

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
