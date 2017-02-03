"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
// var expressValidator = require('express-validator');
// app.use(expressValidator());

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
// Implement the GET / endpoint. DONE
router.get('/', function(req, res) {
  Project.find(function(err, array) {
    res.render('index.hbs', {items: array});
  });
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // Project.find(function(err, array) { // WHY?
  //   res.render('new.hbs', {items: array});
  // });
  res.render('new.hbs');
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  req.checkBody('title', 'Invalid title').notEmpty();
  req.checkBody('goal', 'Invalid goal').notEmpty().isInt();
  req.checkBody('start', 'Invalid start date').isDate();
  req.checkBody('end', 'Invalid end date').isDate();

  var errors = req.validationErrors();
  var myProject = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,

  });

  if(errors) {
    res.render('new.hbs', {
      myProject: myProject,
      // update date properties of myProject here later
      errors: errors
    });
  } else {
    myProject.save(function(err, myProject) {
      if(err) {
        console.log('you got err!')
      } else {
        // res.render('/new');
        res.redirect('/');
      }
    });
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    //found executed if object is found
    console.log(req.params.projectid);
    if(err) {
      console.log('cloud error')
    } else {
      var total =0;
      //render makes html
      // uses project template +
      // Have to put total = 0 to display it in project.hbs. Otherwise it will display null
      found.contributions.forEach(function(i){
        //"found" bc object here is "found"
        //"found" contains donation amount of one PROJECT, not one person
        total += i['amount'];
      })

      // percentage of project goal meet
      var percentage = total/ found.goal * 100;
      //.get because it will display every time someone visit your website
      console.log("THIS SHOULD WORK");
      console.log(found);
      res.render('project', {
        project: found,
        fuckthis: total,
        progressbar: percentage
        //store that value into a random variable. project is also a random variable

        // think of project as a name I assigned but the value is the actual object
        // project = random key that we give and must make it matched on project.hbs
        // found is the value that comes from the database


        //loop thru contribution array, add to the total until i'm done, send it to front end and display it
        //{{total}}

        // project = random key that we give and must make it matched on project.hbs
        // found is the value that comes from the database
      })
    }
  });
});

// Exercise 4: Contribute to a project
// Implement the GET BUT IT'S REALLY POST LMAO /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    // Project(big P) contains all the projects
    // found is the project that matches the projectid from req.params.projectid
    console.log('this is found')
    console.log(found);
    if(err) {
      console.log('cloud error again b');
    } else {
      found.contributions.push({name: req.body.name, amount: req.body.amount})
// req.body.name: body is from the body of the form in project.hbs
      //meaning? What is found?
      //contributions = array
      // console.log(found.contributions)
      console.log(req.body)
      total = req.body.amount //maybe parse int if string
      found.save(function(err, found) {
        //found- save yourself and then calls the function next to you
        if(err) {
          // if the save action fails because you don't have the right data or whatever reason, console.log
          console.log('you got a deeper err')
          console.log(found)

        } else {
          res.render('project', found)
        }
      })
    }
  })
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
