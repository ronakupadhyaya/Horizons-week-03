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
  Project.find(function(err, projects) {
    if (err) {
      console.log('Error:', err);
    };
    if (req.query.sort === 'start') {
      projects.sort(function(a,b) {
        return new Date(a.start) - new Date(b.start);
      });
    };
    if (req.query.sort === 'end') {
      projects.sort(function(a,b) {
        return new Date(a.end) - new Date(b.end);
      });
    };
    if (req.query.sort === 'goal') {
      projects.sort(function(a,b) {
        return a.goal - b.goal;
      });
    };
    if (req.query.sort === 'totalContribution') {
      projects.sort(function(a,b) {
        return a.contributions.map(function(a){return a.amount}).reduce(function(a, b) {return a + b}) - b.contributions.map(function(a){return a.amount}).reduce(function(a, b) {return a + b});
      });
    };
    if (req.query.sort === 'fullyFunded') {
      projects = projects.filter(function(a) {
        var totalRaised = a.contributions.map(function(a){return a.amount}).reduce(function(a, b) {return a + b})
        var raisedPercentage = Math.floor((totalRaised/a.goal) * 100);
        return raisedPercentage >= 100;
      });
    };
    if (req.query.sort === 'notFullyFunded') {
      projects = projects.filter(function(a) {
        var totalRaised = a.contributions.map(function(a){return a.amount}).reduce(function(a, b) {return a + b})
        var raisedPercentage = Math.floor((totalRaised/a.goal) * 100);
        return raisedPercentage < 100;
      });
    };
    if (req.query.sortDirection === 'ascending') {
      projects;
    };
    if (req.query.sortDirection === 'descending') {
      projects.reverse();
    };
    res.render('index', {projects: projects});
  })
});
//
// router.get('/', function(req, res) {
//   Project.find(function(err, projects) {
//     if (err) res.send(err);
//     var flash;
//     if (req.session.flash)
//       flash = req.session.flash.shift();
//     res.render('index', {projects: projects, title: "Horizon Starter", flash: flash});
//   });
// });

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new')
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('projectTitle', 'Project title required.').notEmpty();
  req.checkBody('projectGoal', 'Project goal required.').notEmpty();
  req.checkBody('projectGoal', 'Project goal needs to be a number.').isInt();
  req.checkBody('projectStart', 'Project start date required.').notEmpty();
  req.checkBody('projectStart', 'Project start date needs to be a date.').isDate();
  req.checkBody('projectEnd', 'Project end date required.').notEmpty();
  req.checkBody('projectStart', 'Project end date needs to be a date.').isDate();
  var errors = req.validationErrors();
  if (errors) {
    console.log(errors)
    res.render('new', {errors: errors,
      title: req.body.projectTitle,
      goal: req.body.projectGoal,
      description: req.body.projectDescription,
      category: req.body.projectCategory,
      start: req.body.projectStart,
      end: req.body.projectEnd
    })
  } else {
    console.log(req.body)
    var project = new Project({
      title: req.body.projectTitle,
      goal: req.body.projectGoal,
      description: req.body.projectDescription,
      category: req.body.projectCategory,
      start: req.body.projectStart,
      end: req.body.projectEnd
    });
    project.save(function(error) {
      if (error) {
        console.log('Error', error);
      } else {
        console.log('Project successfully created!');
        res.redirect('/');
      };
    });
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var totalRaised = 0;
  var raisedPercentage = 0;
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log(err)
    } else {
      if (project.contributions.length> 0) {
        var totalRaised = project.contributions.map(function(a){return a.amount}).reduce(function(a, b) {return a + b});
        var raisedPercentage = Math.floor((totalRaised/project.goal) * 100);
      }
      console.log(totalRaised)
      res.render('project', {
        project: project,
        totalRaised: totalRaised,
        raisedPercentage: raisedPercentage
      });
    };
  });
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var totalRaised = 0;
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log(err)
    } else {
      req.checkBody('contributorName', 'Name is required!').notEmpty();
      req.checkBody('contributorAmount', 'Contribution amount needed to contribute!').notEmpty();
      req.checkBody('contributorAmount', 'Contribution amount needs to be a number!').isInt();
      var errors = req.validationErrors();
      if (errors) {
        console.log(errors)
        res.render('new', {errors: errors})
      } else {
        var contributor = {
          name: req.body.contributorName,
          amount: req.body.contributorAmount
        };
        project.contributions.push(contributor);
        project.save(function(error) {
          if (error) {
            console.log('Error', error);
          } else {
            if (project.contributions.length> 0) {
              var totalRaised = project.contributions.map(function(a){return a.amount}).reduce(function(a, b) {return a + b});
              var raisedPercentage = Math.floor((totalRaised/project.goal) * 100);
            }
            console.log('Successfully contributed to project!');
            res.render('project', {
              project: project,
              totalRaised: totalRaised,
              raisedPercentage: raisedPercentage
            });
          };
        });
      };
    };
  });
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log(err)
    } else {
      res.render('editProject', {
        project: project,
      });
    };
  });
});

// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  req.checkBody('projectEditTitle', 'Project title required.').notEmpty();
  req.checkBody('projectEditGoal', 'Project goal required.').notEmpty();
  req.checkBody('projectEditGoal', 'Project goal needs to be a number.').isInt();
  req.checkBody('projectEditStart', 'Project start date required.').notEmpty();
  req.checkBody('projectEditStart', 'Project start date needs to be a date.').isDate();
  req.checkBody('projectEditEnd', 'Project end date required.').notEmpty();
  req.checkBody('projectEditStart', 'Project end date needs to be a date.').isDate();
  var errors = req.validationErrors();
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.projectEditTitle,
    goal: req.body.projectEditGoal,
    description: req.body.projectEditDescription,
    category: req.body.projectEditCategory,
    start: req.body.projectEditStart,
    end: req.body.projectEditEnd
  }, function(err, project) {
    if (errors) {
      console.log(errors)
      res.render('editProject', {
        errors: errors,
        project: project
      });
    } else if (err) {
      console.log(err)
    } else {
      console.log("Project successfully updated!")
      // res.render('project', {
      //   project: project
      // });
      res.redirect(('/project/' + req.params.projectid));
    };
  });
});

module.exports = router;
