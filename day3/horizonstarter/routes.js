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

// TODO: function toDateStr(date) {
//   return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate() + 1);
// }

// Exercise 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  // YOUR CODE HERE
  Project.find(function(err, array) {
    console.log('ARRAY');
    console.log(array);
    res.render('index.hbs', {items: array});
  });
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new.hbs', {
    category:Project.schema.path('category').enumValues
  });
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('title', 'Invalid Title').notEmpty();
  req.checkBody('goal', 'Invalid Goal').notEmpty();
  req.checkBody('start', 'Invalid Start Date').isDate();
  req.checkBody('end', 'Invalid End Date').isDate();
  var errors = req.validationErrors();
  var thisProject = new Project ({
    category: req.body.category,
    title: req.body.title,
    goal: req.body.goal,
    desc: req.body.desc,
    start: req.body.start,
    end: req.body.end
  });

  if(errors) {
    res.render('new.hbs', {
      thisProject:thisProject,
      errors:errors
      // newDate:thisProject.start, TODO implement date parse
    });
  } else {
    thisProject.save(function(err, thisProject) {
      if(err) {
        console.log(err);
      } else {
        console.log("Project saved!");
        res.redirect('/');
      }
    })
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, found) {
    if(err) {
      console.log(err);
      console.log('Error finding project');
    } else {
      var total = 0;
      for (var i = 0; i < found.contributions.length; i++) {
        total += parseInt(found.contributions[i].amount);
      }
      var percent = (total/parseInt(found.goal))*100;
      res.render('project.hbs', {
        found:found,
        total:total,
        percent:percent
      });
    }
  });
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint

router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, found) {
    if(err) {
      console.log(err);
      console.log('Error finding project');
    } else {
      found.contributions.push({name: req.body.name, amount: req.body.amount});
      // found.total = parseInt(req.body.amount);
      // var totalContributions = parseInt(found.total);
      // var percent = (totalContributions/parseInt(found.goal))*100;
      // found.progress = percent;
      found.save(function(err, found) {
        if(err) {
          console.log(err);
        } else {
          console.log("Project saved!");
          res.redirect('/project/' + req.params.projectid);
        }
      })
    }
  })
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req,res) {
  Project.findById(req.params.projectid, function(err, found) {
    if(err) {
      console.log(err);
      console.log('Error finding project');
    } else {
      var allCategories = Project.schema.path('category').enumValues;
      allCategories.splice(allCategories.indexOf(found.category), 1);
      console.log(found);
      console.log(found._id);
      res.render('editProject.hbs', {
        thisProject: found,
        category:allCategories
      })
    }
  })
})

// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req,res) {
  Project.findByIdAndUpdate(req.params.projectid, {
    category: req.body.category,
    title: req.body.title,
    goal: req.body.goal,
    desc: req.body.desc,
    start: req.body.start,
    end: req.body.end
  }, function(err) {
    if(err) {
      console.log(err);
      console.log('Error finding project');
    } else {
      res.redirect('/project/' + req.params.projectid);
    }
  })
})

module.exports = router;
