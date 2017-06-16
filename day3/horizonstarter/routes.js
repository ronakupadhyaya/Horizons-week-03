"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models')
  .Project;
var strftime = require('strftime');

// Example endpoint - This endpoint creates a Project object and saves it to
// MongoDb
router.get('/create-test-project', function(req, res) {
  var project = new Project({
    title: 'I am a test project'
  });
  project.save(function(err) {
    if (err) {
      res.status(500)
        .json(err);
    } else {
      res.send('Success: created a Project object in MongoDb');
    }
  });
});

var total = 0;

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  // YOUR CODE HERE
  Project.find(function(err, array) {
    res.render('index', {
      items: array
    });
  });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new', {
    // we don't need this b/c we don't need to provide any entries
  })
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  console.log(req.body)
  /*
{
title: "Hello",
description: "the thing i typed"
}
  */
  // YOUR CODE HERE
  // req.checkBody('title', 'Title is required')
  //   .notEmpty();
  // req.checkBody('goal', 'Goal is required')
  //   .notEmpty();
  // req.checkBody('description', 'Description is required')
  //   .notEmpty();
  // req.checkBody('start', 'Start date is required')
  //   .notEmpty();
  // req.checkBody('end', 'End date is required')
  //   .notEmpty();

  // check the validation object for errors
  //  var errors = req.validationErrors();

  //console.log(errors);
  var errors = false;
  if (errors) {
    // res.render('new', {
    //   project: {
    //     title: req.body.title,
    //     goal: req.body.goal,
    //     description: req.body.description,
    //     start: req.body.start,
    //     end: req.body.end
    //   }
    // });
    res.render('new', {
      project: req.body
    })
  } else {
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      tc: 0,
      category: req.body.category
    });
    console.log(req.body.category);

    project.save(function(err, savedProject) {
      if (err) {
        // res.status(500)
        //   .json(err);
        //
        res.render('new', {
          project: project,
          error: err
        })
      } else {
        console.log("no error after save", savedProject)
        res.redirect('/');
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, foundProject) {
    if (err) {
      res.status(500)
        .json(err);
    }


    var percentComplete = (foundProject.tc / foundProject.goal) * 100
    res.render('project', {
      project: foundProject,
      total: foundProject.tc,
      progress: percentComplete
    })
  })



});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint <<<TYPO?
router.post('/projects/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      res.status(500)
        .json(err);
    } else {
      var co = {
        name: req.body.name,
        amount: req.body.amount
      };

      //console.log(pro);
      console.log(req.body.amount, parseInt(req.body.amount));
      project.tc += parseInt(req.body.amount)
      project.contribution.push(co);
      project.save(function(err, savedProject) {
        if (err) console.log(err);
        else {
          res.redirect("/project/" +
            req.params.projectid);

        }
      })
    }
  })
});




// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    console.log('baby', project);
    console.log('title tile', req.body);
    res.render('editProject', {
      project: project
    });
  })
});

// Create the POST /project/:projectid/edit endpoint

router.post('/project/:projectid/edit', function(req, res) {
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    tc: req.body.tc,
    category: req.body.category
  }, function(err, savedProject) {
    savedProject.save(function(err, savedProject) {
      if (err) console.log(err);
      else {
        res.redirect("/project/" +
          req.params.projectid);
      }
    });
  })
});


module.exports = router;






// var project = new Project({
//   title: req.body.title,
//   goal: req.body.goal,
//   description: req.body.description,
//   start: req.body.start,
//   end: req.body.end,
//   tc: 0,
//   category: req.body.category
// });
// console.log(req.body.category);
//
// project.save(function(err, savedProject) {
//   if (err) {
//     // res.status(500)
//     //   .json(err);
//     //
//     res.render('new', {
//       project: project,
//       error: err
//     })
//   } else {
//     console.log("no error after save", savedProject)
//     res.redirect('/');
//   }
// });
