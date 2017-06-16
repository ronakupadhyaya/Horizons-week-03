"use strict";

// Routes, with inline controllers for each route.
var all_categories = [{name: "Famous Muppet Frogs",
                       selected: false},
                       {name: "Current Black Presidents",
                       selected: false},
                       {name: "The Pen Is Mightier",
                       selected: false},
                       {name: "Famous Mothers",
                       selected: false},
                       {name: "Drummers Named Ringo",
                       selected: false},
                       {name: "1-Letter Words",
                       selected: false},
                       {name: 'Months That Start With "Feb"',
                       selected: false},
                       {name: "How Many Fingers Am I Holding Up",
                       selected: false},
                       {name: "Potent Potables",
                       selected: false}];

var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

function formatDate(date) {
  date = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 9 ? "0" + (date.getDate() + 1) : date.getDate() + 1;
  return year + "-" + month + "-" + day;
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
  // YOUR CODE HERE
  Project.find(function(err, projects) {
    var descending = req.query && req.query.sort_direction==="descending";
    var descending = descending ? -1 : 1;
    console.log(descending);
    if (req.query && req.query.sort) {
      var sortObject = {};
      sortObject[req.query.sort] = descending;
      Project.find().sort(sortObject).exec(function(err, array) {
        // YOUR CODE HERE
        res.render("index", {
          projects: array
        })
      });
    } else {
      res.render("index", {
        projects: projects
      });
    }
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  console.log(JSON.parse(JSON.stringify(all_categories)));
  res.render("new", {
    categories: all_categories,
  })
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody("title", "Title must not be empty").notEmpty();
  req.checkBody("goal", "Goal must not be empty").notEmpty().isNumeric();
  req.checkBody("start", "Must specify start date").notEmpty().isDate();
  req.checkBody("end", "Must specify end date").notEmpty().isDate();
  req.checkBody("category", "Must sepcify category").notEmpty();

  var errors = req.validationErrors();

  var newProject = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  });

  if (errors) {
    var missing_params = [];
    errors.forEach(function(err) {
      if (missing_params.indexOf(err.param) == -1) {
        missing_params.push(err.param);
      }
    });
    var error_msg = missing_params.join(", ") + " must not be empty.";
    error_msg = error_msg.charAt(0).toUpperCase() + error_msg.slice(1);

    var categories = JSON.parse(JSON.stringify(all_categories));
    categories.map(function(item) {
      if (item.name == newProject.category) {
        item.selected = true;
      }
      return item;
    })
    res.render("new", {
      error_msg: error_msg,
      project: newProject,
      start_date: formatDate(newProject.start),
      end_date: formatDate(newProject.end),
      categories: categories,
    });
  } else {

    newProject.save(function(err) {
      if (err) {
        res.render("new", {
          error_msg: "Could not save project."
        })
      } else {
        res.redirect("/")
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      res.redirect("/");
    } else {
      var total_contribution = project.contributions.reduce(function(value, contribution){
        return value + contribution.amount;
      }, 0);
      var contribution_completion = 100 * total_contribution / project.goal;
      total_contribution = total_contribution.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

      res.render("project", {
        project: project,
        total_contribution: total_contribution,
        completion: contribution_completion,
        goal: project.goal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      });
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid/contribution', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.body.params.projectid, function(err, project) {
    if (err) {
      res.redirect("/");
    } else {
      var newContribution = {name: req.body.body.name, amount: req.body.body.amount};
      project.contributions.push(newContribution);

      var total_contribution = project.contributions.reduce(function(value, contribution){
        return value + contribution.amount;
      }, 0);
      var contribution_completion = 100 * total_contribution / project.goal;
      total_contribution = total_contribution.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

      project.save(function(err) {
        if (err) {
          console.log("Error", err);
        } else {
          res.json({
            project: project,
            total_contribution: total_contribution,
            completion: contribution_completion,
            goal: project.goal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
          });
        }
      })
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get("/project/:projectid/edit", function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      res.redirect("/");
    } else {
      var categories = JSON.parse(JSON.stringify(all_categories));
      categories.map(function(item) {
        if (item.name == project.category) {
          item.selected = true;
        }
        return item;
      })
      res.render("editProject", {
        project: project,
        start_date: formatDate(project.start),
        end_date: formatDate(project.end),
        categories: categories
      });
    }
  })
})

// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  req.checkBody("title", "Title must not be empty").notEmpty();
  req.checkBody("goal", "Goal must not be empty").notEmpty().isNumeric();
  req.checkBody("start", "Must specify start date").notEmpty().isDate();
  req.checkBody("end", "Must specify end date").notEmpty().isDate();
  req.checkBody("category", "Must sepcify category").notEmpty();

  var errors = req.validationErrors();

  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      res.redirect("/");
    } else {
      var edittedProject = project;
      edittedProject.title = req.body.title;
      edittedProject.goal = req.body.goal;
      edittedProject.description = req.body.description;
      edittedProject.start = req.body.start;
      edittedProject.end = req.body.end;
      edittedProject.category = req.body.category;

      if (errors) {
        var missing_params = [];
        errors.forEach(function(err) {
          if (missing_params.indexOf(err.param) == -1) {
            missing_params.push(err.param);
          }
        });
        var error_msg = missing_params.join(", ") + " must not be empty.";
        error_msg = error_msg.charAt(0).toUpperCase() + error_msg.slice(1);

        var categories = JSON.parse(JSON.stringify(all_categories));
        categories.map(function(item) {
          if (item.name == edittedProject.category) {
            item.selected = true;
          }
          return item;
        })
        res.render("editProject", {
          error_msg: error_msg,
          project: edittedProject,
          start_date: formatDate(edittedProject.start),
          end_date: formatDate(edittedProject.end),
        });
      } else {
        edittedProject.save(function(err) {
          if (err) {
            res.render("editProject", {
              error_msg: "Could not save project."
            })
          } else {
            res.redirect("/")
          }
        })
      }
    }
  })
});

module.exports = router;
