"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({title: 'I am a test project'});
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
  if (req.query.sort === 'start' || req.query.sort === 'end') {
    console.log("direction", typeof req.query.sortDirection);
    var sortObject = {};
    if (parseInt(req.query.sortDirection) === -1) {
      console.log('yooo');
      sortObject[req.query.sort] = -1;
      Project.find().sort(sortObject).exec(function(err, array) {
        res.render("index", {projects: array});
      });
    } else {
      sortObject[req.query.sort] = 1;
      Project.find().sort(sortObject).exec(function(err, array) {
        res.render("index", {
          projects: array,
          link: `/project/${this._id}`
        });
      });
    }
  } else if (req.query.sort === 'funded') {
    var sortFunded = true;
      Project.find(function(error, projects) {
        if(error) {
          console.log(errro);
        } else {
          var fundedProjects = projects.filter(function(project) {
            return project.funded === true
          })
          var notFundedProjects = projects.filter(function(project) {
            return project.funded === false
          })
          res.render("index", {
            sortFunded: sortFunded,
            fundedProjects: fundedProjects,
            notFundedProjects: notFundedProjects
          })
        }
      })
  } else {

    Project.find(function(error, projects) {
      if (error) {
        console.log(error);
      } else {
        console.log('There are some! :) ');
        res.render('index', {projects: projects})
      }
    })
  }
});


// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  if (req.body.title === '' || req.body.goal === '' || req.body.desc === '') {
    res.render('new', {error: 'ERROR!'})
  } else {
    var project = new Project({title: req.body.title, goal: req.body.goal, description: req.body.desc, start: req.body.start, end: req.body.end, totalContributions: 0, category: req.body.category, funded: false})
    project.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        Project.find(function(error, projects) {
          if (error) {
            console.log(error);
          } else {
            console.log('There are some! :) ');
            res.render('index', {projects: projects})
          }
        })
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projectid = req.params.projectid;
  Project.findById(projectid, function(error, project) {
    if (error) {
      console.log(error);
    } else {
      console.log('There are some! :) ');
      res.render('project', {project: project})
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var projectid = req.params.projectid;
  Project.findById(projectid, function(error, project) {
    if (error) {
      console.log(error);
    } else {
      console.log('There are some! :) ');
      if (req.body.name === '' || req.body.amount === '') {
        console.log('ERROR');
      } else {
        project.contributions.push({name: req.body.name, amount: req.body.amount})
        project.totalContributions += parseInt(req.body.amount);
        project.save(function(err) {
          if (err) {
            res.status(500).json(err);
          } else {
            var url = "project/" + project._id;
            var goalPercent = (project.totalContributions / project.goal) * 100;
            console.log('this is the goal percent', goalPercent);
            if (goalPercent >= 100) {
              Project.findByIdAndUpdate(projectid, {
                funded: true,
              }, function(err) {
                if (err) {
                  console.log(':9');
                } else {
                  console.log('success!!! :) ');
                }
              })
            }
            var width = `width:${goalPercent}%`;
            res.render('contributions', {project: project, goalPercent: goalPercent, width: width});
          }
        })
      }
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  var projectid = req.params.projectid;
  Project.findById(projectid, function(error, project) {
    if (error) {
      console.log(error);
    } else {
      var URL = `/project/${projectid}/edit`
      res.render('editProject', {
        project: project,
        start: project.start.toISOString().substring(0, 10),
        end: project.end.toISOString().substring(0, 10),
        URL: URL
      })
    }
  });

})

router.post('/project/:projectid/edit', function(req, res) {
  var projectid = req.params.projectid;
  Project.findByIdAndUpdate(projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.desc,
    start: req.body.start,
    end: req.body.start
  }, function(err) {
    if(err) {
      console.log('yo');
    }
    else {
      console.log('SUCCESS!');
      res.redirect(`/`);
    }
  })
})


app.post('/api/project/:projectId/contributions', function(req, res) {
  var projectid = req.body.projectId;
  Project.findById(projectId, function(error, project) {
    if(error) {
      console.log(":(");
    } else {
      console.log('yay!');
    }
  })
})


module.exports = router;
