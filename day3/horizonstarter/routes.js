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

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  var sort = req.query.sort;
  var sortDirection = req.query.sortDirection;
  var filter = req.query.filter

  Project.find(function(err, projects) {
    if (err) {
      console.log("Error: couldn't get all projects.");
    } else {
      console.log("Success! You got all the projects!");

      // filtering
      if (filter) {
        // inserting percent
        projects.forEach(function(project) {
          if (project.contributions === null || !project.percent) {
            return;
          } else {
            var totalcontributions = 0;
            project.contributions.forEach(function(donation) {
              totalcontributions += parseInt(donation.amount);
            })
            var percent = totalcontributions / project.goal * 100;
            project.totalcontributions = totalcontributions;
            project.percent = percent;
            project.save()
          }
        })

        if(filter ==='full') {
          console.log(projects);
          var filteredProjects = projects.filter(function(project) {
            return project.percent >= 100;
          })
        }
        if(filter === 'notfull'){
          var filteredProjects = projects.filter(function(project) {
            return project.percent <= 100;
          })
        }
        res.render('index', {
          projects: filteredProjects,
        })
      }

      // sorting
      if (sort) {
        if (sort === 'totalcontributions') {
          projects.forEach(function(project) {
            if (project.contributions === null)
              return;

            var totalcontributions = 0;

            project.contributions.forEach(function(donation) {
              totalcontributions += parseInt(donation.amount);
            })
            project.totalcontributions = totalcontributions;
            project.save()
          })
        }
        var sortObject = {};
        sortObject[sort] = sortDirection || 1;
        Project.find().sort(sortObject).exec(function(err, projectsSorted) {
          if (err) {
            console.log("Error: can't sort by query");
          } else {
            res.render('index', {
              projects: projectsSorted,
            })
          }
        });

      }
      if(!sort && !filter) {
        res.render('index', {
          projects: projects,
        })
      }
    }
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  req.checkBody('title', 'No title').notEmpty();
  req.checkBody('goal', 'No goal').notEmpty();
  req.checkBody('description', 'No description').notEmpty();
  req.checkBody('start', 'No start').notEmpty();
  req.checkBody('end', 'No end').notEmpty();
  req.checkBody('category', 'Please indicate category').notEmpty();
  var errors = req.validationErrors();
  if (errors.length > 0) {
    res.render('new', {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category,
    })
  } else {
    var newProject = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category,
    })
    newProject.save(function(err) {
      if (err) {
        console.log(err)
        console.log("Error: could not save new project.");
      } else {
        res.redirect('/');
      }
    });
  }


});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projID = req.params.projectid;
  var totalContributions = 0;

  Project.findById(projID, function(err, project) {
    if (err) {
      console.log("Error: couldn't find project by ID", err);
    } else {
      project.contributions.forEach(function(donation) {
        return totalContributions += parseInt(donation.amount);
      })
      var percent = totalContributions / project.goal * 100;
      res.render('project', {
        project: project,
        projectID: projID,
        title: project.title,
        description: project.description,
        goal: project.goal,
        start: project.start,
        end: project.end,
        contributions: project.contributions,
        category: project.category,
        totalContributions: totalContributions,
        percent: percent,
      })
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var projID = req.params.projectid;
  var name = req.body.name;
  var amount = req.body.amount;
  Project.findById(projID, function(err, project) {
    if (err) {
      console.log("Error: can't find project.");
    } else {
      var newContribution = {
        name: name,
        amount: amount,
      }
      project.contributions.push(newContribution);
      project.save();
      res.redirect('/project/'+ req.params.projectid)
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  var projID = req.params.projectid;
  Project.findById(projID, function(err, project) {
    // console.log("HOIAJKSLNPOEISFJKNOEFJK", project.schema.path('category').enumValues);
    if (err) {
      console.log("Error: can't edit this project.");
    } else {
      var totalContributions = null;
      project.contributions.forEach(function(donation) {
        return totalContributions += parseInt(donation.amount);
      })
      var percent = totalContributions / project.goal * 100;


      var enumArr = project.schema.path('category').enumValues;
      var enumObj = enumArr.map(function(a) {
        return {name: a, selected: a === project.category ? "selected" : " "}
      })


      var start = project.start.toISOString().substring(0, 10);
      var end = project.end.toISOString().substring(0, 10);

      res.render('editProject', {
        project: project,
        projectID: projID,
        title: project.title,
        description: project.description,
        goal: project.goal,
        start: start,
        end: end,
        contributions: project.contributions,
        category: project.category,
        totalContributions: totalContributions,
        enum: enumObj,
        percent: percent,
      })
      }
  })
})
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  var projID = req.params.projectid;

  Project.findByIdAndUpdate(projID, {
    projectID: projID,
    title: req.body.title,
    description: req.body.description,
    goal: req.body.goal,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category,
  }, function(err, project) {
    if (err) {
      console.log("Error, can't find by ID and update.");
    } else {
      console.log("Success! you just updated your thing!");
      res.redirect('/project/' + projID)
    }
  })
})

// AJAAAXXX
router.post('/api/project/:projectId/contribution', function(req, res) {
  var projID = req.params.projectId;
  var name = req.body.name;
  var amount = req.body.amount;
  console.log(name, amount);

  Project.findById(projID, function(err, project) {
    if (err) {
      console.log("Error: can't find project.");
      return;
    } else {
      var newContribution = {
        name: name,
        amount: amount,
      }
      project.contributions.push(newContribution);
      project.save(project, function(err, project) {
        if (!err) {
          res.json(project)
        } else {
          res.redirect('/project/'+ req.params.projectid)
        }
      });
    }
    })
})
module.exports = router;
