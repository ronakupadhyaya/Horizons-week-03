"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

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
  if (req.query.sort) {
    if (req.query.sort === 'totalContributions') {
      Project.find(function(error, projects) {
        if (error) {
          res.send("There was an error: " + error);
        } else {
          projects = projects.sort(function(a, b) {
            a = a.contributions.reduce(function(c, d) {
              return c + d.amount;
            }, 0);
            b = b.contributions.reduce(function(c, d) {
              return c + d.amount;
            }, 0);
            return req.query.sortDirection === 'descending' ? b - a : a - b;
          })
          if (req.query.funded === 'yes') {
            projects = projects.filter(function(project) {
              return project.goal <= project.contributions.reduce(function(a, b) {
                return a + b.amount;
              }, 0);
            });
          }
          if (req.query.funded === 'no') {
            projects = projects.filter(function(project) {
              return project.goal > project.contributions.reduce(function(a, b) {
                return a + b.amount;
              }, 0);
            });
          }
          res.render('index', {
            projects: projects,
            sort: req.query.sort,
            order: req.query.sortDirection,
            funded: req.query.funded
          });
        }
      })
    } else {
      var sortObject = {};
      if (req.query.sortDirection === 'descending') {
        sortObject[req.query.sort] = -1;
      } else {
        sortObject[req.query.sort] = 1;
      }
      Project.find().sort(sortObject).exec(function(err, projects) {
        // YOUR CODE HERE
        if (err) {
          res.send(`There was an error loading projects: ${error}`);
        } else {
          if (req.query.funded === 'yes') {
            projects = projects.filter(function(project) {
              return project.goal <= project.contributions.reduce(function(a, b) {
                return a + b.amount;
              }, 0);
            });
          }
          if (req.query.funded === 'no') {
            projects = projects.filter(function(project) {
              return project.goal > project.contributions.reduce(function(a, b) {
                return a + b.amount;
              }, 0);
            });
          }
          res.render('index', {
            projects: projects,
            sort: req.query.sort,
            order: req.query.sortDirection,
            funded: req.query.funded
          })
        }
      });
    }
  } else {
    Project.find(function(error, projects) {
      if (error) {
        res.send(`There was an error loading projects: ${error}`);
      } else {
        if (req.query.funded === 'yes') {
          projects = projects.filter(function(project) {
            return project.goal <= project.contributions.reduce(function(a, b) {
              return a + b.amount;
            }, 0);
          });
        }
        if (req.query.funded === 'no') {
          projects = projects.filter(function(project) {
            return project.goal > project.contributions.reduce(function(a, b) {
              return a + b.amount;
            }, 0);
          });
        }
        res.render('index', {
          projects: projects,
          sort: req.query.sort,
          order: req.query.sortDirection,
          funded: req.query.funded
        })
      }
    })
  }
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  var title = req.body.title;
  var goal = req.body.goal;
  var desc = req.body.description;
  var start = req.body.start;
  var end = req.body.end;
  var category = req.body.category;
  console.log(category);
  if (title && goal && start && end && category) {
    var project = new Project({
      title: title,
      goal: goal,
      description: desc,
      start: start,
      end: end,
      contributions: [],
      category: category
    })
    project.save(function(err) {
      if (err) {
        res.render('new', {
          error: "Error: there was a problem entering the data",
          title: title || "Title",
          goal: goal || 0,
          desc: desc,
          start: start,
          end: end,
          category: category
        })
      } else {
        res.redirect('/');
      }
    })
  } else {
    res.render('new', {
      error: "you entered in some fucked up shit fam",
      title: title || "Title",
      goal: goal || 0,
      desc: desc,
      start: start,
      end: end,
      category: category
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(error, project) {
    if (project) {
      var total = project.contributions.reduce(function(a, b) {
        return a + parseInt(b.amount);
      }, 0);
      console.log(project.category);
      res.render('project', {
        id: req.params.projectid,
        title: project.title,
        goal: project.goal,
        desc: project.description,
        start: project.start.toDateString(),
        end: project.end.toDateString(),
        totalcont: total,
        percentage: (total / project.goal) * 100,
        contributions: project.contributions,
        category: project.category
      })
    } else {
      res.send('This project does not exist');
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(error, project) {
    if (project) {
      project.contributions.push({
        name: req.body.name,
        amount: req.body.amount
      })
      project.save(function(err) {
        if (err) {
          res.send(err)
        } else {
          res.redirect(`/project/${req.params.projectid}`);
        }
      })
    } else {
      res.send("crazy bullshit", error);
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(error, project) {
    if (project) {
      res.render('editProject', {
        project: project,
        start: project.start.toJSON().slice(0, 10),
        end: project.end.toJSON().slice(0, 10)
      })
    } else {
      res.send("some shit went down");
    }
  })
})

// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }, function(err, project) {
    if (err) {
      res.render('editProject', {
        project: project,
        start: project.start.toJSON().slice(0, 10),
        end: project.end.toJSON().slice(0, 10)
      })
    } else {
      res.redirect('/');
    }
  })
})

module.exports = router;
