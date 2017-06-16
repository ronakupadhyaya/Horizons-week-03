"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var validator = require('express-validator');
var enumArr = ["Famous Muppet Frogs", "Current Black Presidents", "The Pen is Mightier",
"Famous Mothers", "Drummers Named Ringo", "1-Letter Words",
"Months That Start With 'Feb'", "How Many Fingers Am I Holding Up",
"Potent Potables"];

router.use(validator());

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
  if(req.query.filter) {
    var filter = req.query.filter;
    if(filter === "fully") {
      Project.find(function(err, projectArr) {
        projectArr = projectArr.filter(function(project) {
          if (project.total / project.goal >= 1) {
            return project;
          }
        })
        res.render('index', {items: projectArr});
      });
    } else if (filter === "notfully") {
      Project.find(function(err, projectArr) {
        projectArr = projectArr.filter(function(project) {
          if (project.total / project.goal < 1) {
            return project;
          }
        })
        res.render('index', {items: projectArr});
      });
    }
  }
  if (req.query.sort) {
    var sortObject = {};
    if (parseInt(req.query.sortDirection) === -1) {
      sortObject[req.query.sort] = -1;
      Project.find().sort(sortObject).exec(function(err, array) {
        res.render("index", {items: array, selected: req.query.sort});
      });
    } else {
      sortObject[req.query.sort] = 1;
      Project.find().sort(sortObject).exec(function(err, array) {
        res.render("index", {items: array, selected: req.query.sort});
      });
    }
  } else {
    Project.find(function(err, projectArr) {
      res.render("index", {items:projectArr});
    });
  }
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render("new", {enumArr: enumArr});
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  var title = req.body.title;
  var goal = parseInt(req.body.goal);
  var description = req.body.description;
  var start = req.body.start;
  var end = req.body.end;

  if (!title || !goal || !start || !end) {
    var errorArr = [];
    if (!title) {
      errorArr.push({msg:"Title is required!", name: "title"});
    }
    if (!goal) {
      errorArr.push({msg:"Goal is required!", name:"goal"})
    }
    if (!start) {
      errorArr.push({msg:"Start date required!", name: "start"})
    }
    if (!end) {
      errorArr.push({msg:"End date required!", name:"end"})
    }
    res.render("new", {
      title: title || "Title required!",
      goal: goal || "Goal required!",
      description: description,
      errors: true,
      errorArr: errorArr,
      enumArr: enumArr
    });
  } else {
    var newProject = new Project({
      title: title,
      goal: goal,
      description: description,
      start: new Date(start),
      end: new Date(end),
      total: 0,
      category: req.body.categories
    });
    newProject.save(function(error) {
      if(!error) {
        res.redirect("/");
      } else {
        console.log("not saved");
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err, foundProject) {
    if (err) {
      console.log("error with findId")
    } else {
      var percentage = Math.round(foundProject.total / foundProject.goal * 100);
      res.render("project", {project: foundProject, percentage: percentage});
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err, foundProject) {
    if (err) {
      console.log("error with contribution")
    } else {
      foundProject.contributions.push({name: req.body.name, amount: parseFloat(req.body.amount)});
      foundProject.save(function(error) {
        if (error) {
          console.log("error making contribution")
        } else {
          foundProject.total += parseFloat(req.body.amount);
          var percentage = Math.round(foundProject.total / foundProject.goal * 100);
          foundProject.save(function(error) {
            if(error) {
              console.log("error saving post");
            } else {
              res.render("project", {project: foundProject, percentage: percentage});
            }
          });
        }
      });
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  var projectid = req.params.projectid;
  Project.findById(projectid, function(error, foundProject) {
    if(error) {
      console.log("error, get/edit");
    } else {
      var start = foundProject.start.toISOString().substring(0, 10);
      var end = foundProject.end.toISOString().substring(0, 10);
      var index = enumArr.indexOf(foundProject.category);
      var copyEnum = enumArr;
      copyEnum = copyEnum.slice(index, index+1);
      res.render('editProject', {project: foundProject, enumArr: copyEnum,
        start:start, end: end, selected: foundProject.category});
      }
    })
  });

  router.post('/project/:projectid/edit', function(req, res) {
    var projectid = req.params.projectid;
    Project.findByIdAndUpdate(projectid, {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.categories
    }, function(err, foundProject) {
      console.log("found", foundProject);
      if(err) {
        console.log("error updating project")
      } else {
        res.redirect(`/project/${projectid}`);
      }
    });
  });

  router.post("/api/project/:projectid/contribution", function(req, res) {
    var projectid = req.params.projectid;
    Project.findById(projectid, function(error, foundProject) {
      if (error) {
        console.log("Project not found")
      } else {
        var contributionObj = {name: req.body.name, amount: parseFloat(req.body.amount)};
        req.checkBody({
          'amount': {
            isFloat: {
              options: [{min: 0.01}]
            },
            errorMessage: "Invalid amount"
          }
        });
        var err = req.validationErrors();
        if(err) {
          res.status(400).json(err);
        } else {
          foundProject.contributions.push(contributionObj);
          foundProject.save(function(error) {
            if (error) {
              console.log("error saving contribution")
            } else {
              res.json(contributionObj);
            }
          })
        }
      }
    })
  })

  module.exports = router;
