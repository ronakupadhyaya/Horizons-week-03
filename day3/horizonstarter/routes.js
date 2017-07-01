"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var _ = require('underscore');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(expressValidator());

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

var sortDirection = 1;

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  var sortObject = {};
  var contSortObject = {};
  if (req.query.direction === "desc") {
      sortDirection = -1;
  }
  else if (req.query.direction === "asc") {
      sortDirection = 1;
  }
  sortObject[req.query.sort] = sortDirection
  if (sortObject) {
      if (req.query.sort === 'cont') {
          Project.find().sort(sortObject).exec(function(err, projects) {
              var newObject = {}
              var projArray = [];
              projects.forEach(function(project) {
                  projArray.push(project.toObject())
                  projArray.forEach(function(item) {
                      var total = 0;
                      item.contributions.forEach(function (cont) {
                          total = total + cont.amount
                      })
                      item["totalCont"] = total;
                  })
              })
              var sorted = projArray.sort(function(a, b) {
                  if (req.query.direction != 'desc') {
                      return a.totalCont - b.totalCont
                  }
                  else {
                      return b.totalCont - a.totalCont
                  }
              })
              if (err) {
                  console.log("error");
              }
              else {
                  res.render('index', {
                      projects: sorted,
                  })
              }
          })
      }
      else {
           Project.find().sort(sortObject).exec(function(err, projects) {
               if (err) {
                   console.log("error");
               }
               else {
                   res.render('index', {
                       projects: projects,
                   })
               }
           })
      }

  }
  else {
      var projects = Project.find(function(err, projects) {
          if (err) {
              console.log("error");
          }
          else {
              res.render('index', {
                  projects: projects,
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
    req.checkBody('title').notEmpty()
    req.checkBody('goal').notEmpty()
    req.checkBody('start').notEmpty()
    req.checkBody('end').notEmpty()
    var error = req.validationErrors();
    if (error) {
        console.log("error");
    }
    else {
        var project = new Project({
          title: req.body.title,
          goal: req.body.goal,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
          category: req.body.category
        });
        project.save(function(err) {
          if (err) {
            res.status(500).json(err);
          } else {
            console.log("Successfully created a new project!");
          }
        });
    }
    res.redirect('/');
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
      var contArray = project.contributions;
      var total = 0;
      contArray.forEach(function(cont) {
          total = cont.amount + total;
      })
      var startDate = new Date(project.start);
      startDate = startDate.toISOString().substring(0,10);
      var endDate = new Date(project.end);
      endDate = endDate.toISOString().substring(0,10);
      var percentage = total/project.goal*100;
        res.render('project', {
            title: project.title,
            goal: project.goal,
            description: project.description,
            start: startDate,
            end: endDate,
            contributions: project.contributions,
            category: project.category,
            total: total,
            percentage: percentage
        })
  })

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
    var id = req.params.projectid
    var cName = req.body.cName
    var cAmount = req.body.cAmount
    Project.findById(id, function(err, project) {
        project.contributions.push({'name':cName, 'amount': cAmount});
        project.save(function(err) {
            if(err) {
                console.log("error");
            }
            else {
                console.log("saved contribution");
                res.redirect('/project/'+id)
            }
        })
    })

});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
    var id = req.params.projectid;
    Project.findById(id, function(err, project) {
        var startDate = new Date(project.start);
        startDate = startDate.toISOString().substring(0,10);
        var endDate = new Date(project.end);
        endDate = endDate.toISOString().substring(0,10);
        if (err) {
            console.log("error");
        }
        else {
            res.render('editProject', {
                project: project,
                start: startDate,
                end: endDate,
                helpers: {
                    select: function(value, options) {
                      return options.fn(this)
                        .split('\n')
                        .map(function(v) {
                          var t = 'value="' + value + '"'
                          return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
                        })
                        .join('\n')
                    }
                }
            })
        }
    })
})

// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
    var id = req.params.projectid;
    var startDate = new Date(req.body.start);
    startDate = startDate.toISOString().substring(0,10);
    var endDate = new Date(req.body.end);
    endDate = endDate.toISOString().substring(0,10);
    Project.findByIdAndUpdate(id, {
        title: req.body.title,
        goal: req.body.goal,
        description: req.body.description,
        start: startDate,
        end: endDate,
        category: req.body.category
    },
        function(err) {
        if (err) {
            console.log("error");
        }
        else {
            res.redirect('/project/'+id)
        }
    })
})


module.exports = router;
