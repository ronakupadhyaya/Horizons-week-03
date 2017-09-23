"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var catDict = {
  'Famous Muppet Frogs': 'cat1',
  'Current Black Presidents': 'cat2',
  'The Pen is Mightier': 'cat3',
  'Famous Mothers': 'cat4',
  'Drummers Named Ringo': 'cat5',
  '1-Letter Words': 'cat6',
  'Months That Start With "Feb"': 'cat7',
  'How Many Fingers Am I Holding Up': 'cat8',
  'Potent Potables': 'cat9',
}
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
  if(req.query.sort) { // user has sort param
    var sortObject = {};
    sortObject[req.query.sort] = 1;
    Project.find().sort(sortObject).exec(function(err, projects) {
      if(err) {
        res.show('Could not find projects sorted due to ' + err);
      } else {
        if(req.query.sortDirection === 'descending') {
          projects.reverse();
        }
        res.render('index', {
          projectList: projects,
        });
      }
    });
  } else { // no sort param passed in
  Project.find(function(err, projects) {
    if(err) {
      res.status(400).show('Unable to find projects due to ' + err);
    } else {
      projects.forEach(function(project) {
        project.id = project['_id']['$oid'];
      });

      if(req.query.conSort) {
        projects.sort(function(project1, project2) {
          var project1Sum = 0;
          var project2Sum = 0;
          project1.contributions.forEach(function(con) {
            project1Sum += con.amount;
          });
          project2.contributions.forEach(function(con) {
            project2Sum += con.amount;
          });
          return project1Sum - project2Sum;
        });
      }

      if(req.query.funded === 'true') {
        projects = projects.filter(function(project) {
          var projectSum = 0;
          project.contributions.forEach(function(con) {
            projectSum += con.amount;
          });
          var completionRatio = projectSum/project.goal;
          return (completionRatio >= 1);
        });
      }

      if(req.query.funded === 'false') {
        projects = projects.filter(function(project) {
          var projectSum = 0;
          project.contributions.forEach(function(con) {
            projectSum += con.amount;
          });
          var completionRatio = projectSum/project.goal;
          return (completionRatio < 1);
        });
      }

      if(req.query.sortDirection === 'descending') {
        projects.reverse();
      }
      res.render('index', {
        projectList: projects
      });
    }
    });
  }
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
// Deprecated by jQuery, sorry!
router.post('/new', function(req, res) {
  var title = req.body.title;
  var goal = req.body.goal;
  var description = req.body.description;
  var start = req.body.start;
  var end = req.body.end;
  var category = req.body.category;
  if(!( title && goal && start && end)) {
    res.render('new', {
      project: {
        title,
        goal,
        description,
        start,
        end,
        category,
      },
      error: true
    });
  } else {
    var newProject = new Project({
      title,
      goal,
      description,
      start,
      end,
      category,
    });
    newProject.save(function(err) {
      if(err) {
        res.render('new', {
          project: {
            title,
            goal,
            description,
            start,
            end,
            category,
          },
          saveError: err
        });
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    if(err) {
      console.log(err);
    } else {
      var sum;
      var goalPercent;
      if(project.contributions) {
        sum = 0;
        project.contributions.forEach(function(con) {
          sum += con.amount;
        });
        goalPercent = (sum/project.goal)*100;
        goalPercent = goalPercent.toFixed(1);
      }
      res.render('project', {
        project: project,
        sum: sum,
        goalPercent: goalPercent,
      });
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var name = req.body.name;
  var amount = req.body.amount;
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    if(err) {
      res.status(400).show('Unable to access project with id ' + id);
    } else {
      if(isNaN(parseFloat(amount))) { //user didn't type in a number
        res.render('project', {
          project: project,
          numError: true,
          name: name,
          amount: amount,
        });
      } else { //it is a number
        amount = parseFloat(amount);
        var newContribution = {
          name,
          amount,
        };
        if(!project.contributions) { //contributions doesn't exist yet
          project.contributions = [newContribution];
        } else { //it does exist so push to the end
          project.contributions.push(newContribution);
        }
        // all work is done, save the new updated project
        project.save(function(err) {
          if(err) {
            console.log(err);
          } else {
            var sum = 0;
            project.contributions.forEach(function(con) {
              sum += con.amount;
            });
            var goalPercent = (sum/project.goal)*100;
            goalPercent = goalPercent.toFixed(1);
            res.render('project', {
              project: project,
              sum: sum,
              goalPercent: goalPercent,
            });
            }
          });
        }
      }
    });
  });

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
  router.get('/project/:projectid/edit', function(req, res) {
    var id = req.params.projectid;
    Project.findById(id, function(err, project) {
      if(err) {
        res.show('Could not find project with id' + id);
      } else {
        var convertedStart = project.start.toJSON();
        convertedStart = convertedStart.slice(0,10);
        var convertedEnd = project.end.toJSON();
        convertedEnd = convertedEnd.slice(0,10);

        var convertedCat = catDict[project.category];
        // using dictionary to find proper keyword
        var passedInInfo = {
          project,
          convertedStart,
          convertedEnd,
        };
        passedInInfo[convertedCat] = true;

        console.log(passedInInfo);
        res.render('editProject', passedInInfo);
      }
    })
  });

  router.post('/project/:projectid/edit', function(req, res) {
    var id = req.params.projectid;
    var updatedProject = req.body;
    Project.findByIdAndUpdate(id, updatedProject, function(err, project) {
      if(err) {
        res.show('Could not find project with id ' + id);
      } else {
        res.redirect('/project/'+id);
      }
    })
  })

module.exports = router;
