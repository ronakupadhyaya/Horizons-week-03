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
// Implement the GET / endpoint. DONE
router.get('/', function(req, res) {
  Project.find(function(err, array) {
    res.render('index.hbs', {items: array});
  });
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new.hbs', {
    category: Project.schema.path('category').enumValues
  });
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
    category: req.body.category,
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end
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
        console.log(err)
      } else {
        res.redirect('/');
      }
    });
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    if(err) {
      throw err;
    } else {
      var totalContributions = 0;
      // totalContributions += parseInt(found.contributions);
      // var percentage = totalContributions/(parseInt(found.goal));
      for(var i = 0; i < found.contributions.length; i++) {
        totalContributions += found.contributions[i].amount;
      }
      var percent = (totalContributions/parseInt(found.goal))*100;
      res.render('project', {
        found: found,
        total: totalContributions,
        percent: percent
      })
    }
  });
});

// Exercise 4: Contribute to a project
// Implement the GET BUT IT'S REALLY POST LMAO /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  //var totalContributions = 0;
  Project.findById(req.params.projectid, function(err, found) {
    if(err) {
      console.log(err);
    } else {
      // totalContributions += parseInt(req.body.amount);
      console.log(found.contributions)
      found.contributions.push({name: req.body.name, amount: req.body.amount})
      found.save(function(err) {
        if(err) {
          console.log(err)
        } else {
          // found.contributions.push({name: req.body.name, amount: req.body.amount})
          // // var percentage = totalContributions/(parseInt(found.goal));
          // for(var i = 0; i < found.contributions.length; i++) {
          //   totalContributions += found.contributions[i].amount;
          // }
          res.redirect('/project/'+req.params.projectid)
        }
      })
    }
  })
});


// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    if(err) {
      console.log(err);
    } else {
      var allCategories = Project.schema.path('category').enumValues;
      allCategories.splice(allCategories.indexOf(found.category), 1);
      res.render('editProject', {
        myProject: found,
        category: allCategories
      })
    }
  })
});

router.post('/project/:projectid/edit', function(req, res) {
  console.log('req body')
  console.log(req.body.title)
  Project.findByIdAndUpdate(req.params.projectid, {
    category: req.body.category,
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end
  }, function(err) {
    if(err) {
      console.log(err)
    } else {
      res.redirect('/project/'+req.params.projectid)
    }
  });
});

// trying to figure out how to sort
router.get('/', function(req, res) {
  if (req.query.sort) {
    var sortObject = {};
    sortObject[req.query.sort] = 1;
    console.log(sortObject);
    Project.find().sort(sortObject).exec(function(err, array) {
      if(err) {
        console.log(err)
      } else {
        res.redirect('/')
      }
    });
  }
});



module.exports = router;
