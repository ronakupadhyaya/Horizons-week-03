"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Enable form validation with express validator.
var expressValidator = require('express-validator');
router.use(expressValidator());

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  // YOUR CODE HERE
  if (!req.query.sort) {
    console.log('no sort query')
    Project.find(function(error, projects) {
      if (error) {
        res.status(500).json(error)
      } else {
        console.log(projects)
        res.render('index', {
          projects: projects
        })
      }
    });
  } else {
    if (!req.query.sortDirection || req.query.sortDirection === "ascending") {
      // sort by ascending order
      var attribute = req.query.sort
      Project.find(function(error, projects) {
        if (error) {
          res.status(500).json(error)
        } else {
          projects = projects.sort(function(a, b) {
            if (attribute !== "contribution"){
              return a[attribute] > b[attribute]
            } else {
              console.log('heyya')
              var aContributionAmount = 0
              console.log('a contributions: ', a.contributions)
              a.contributions.forEach(function(contribution){
                aContributionAmount = aContributionAmount + contribution.amount
              })
              console.log(aContributionAmount)
              var bContributionAmount = 0
              console.log('b contributions: ', b.contributions)
              b.contributions.forEach(function(contribution){
                bContributionAmount = bContributionAmount + contribution.amount
              })
              console.log(bContributionAmount)
              return aContributionAmount > bContributionAmount
            }
          })
          res.render('index', {
            projects: projects
          })
        }
      });
    } else {
      // sort by descending order
      Project.find(function(error, projects) {
        if (error) {
          res.status(500).json(error)
        } else {
          projects = projects.sort(function(a, b) {
            return a[attribute] < b[attribute]
          })
          res.render('index', {
            projects: projects
          })
        }
      });
    }
  }
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  if (req.validationErrors()) {

    console.log('there are validation errors')
    var projectObj = {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      error: "Please fill out all fields"
    }
    res.render('new', {
      project: projectObj
    })
  } else {
    new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      contributions: [],
      category: req.body.category,
      complete: false
    }).save(function(err) {
      if (err) {
        var projectObj = {
          title: req.body.title,
          goal: req.body.goal,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
          error: "Please fill out all fields"
        }
        res.render('new', {
          project: projectObj
        })
        console.log('ERROR', err)
      } else {
        console.log('SAVED!')
        res.redirect('/')
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err, project) {
    if (err) {
      console.log("This isn't the project you're looking for")
    } else {
      var totalContributionAmount = 0
      project.contributions.forEach(function(contribution) {
        totalContributionAmount = totalContributionAmount + contribution.amount
      })
      res.render('project', {
        project: project,
        projectid: projectid,
        progressPercent: (totalContributionAmount/project.goal)*100
      })
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var name = req.body.name;
  var amount = req.body.amount;
  var projectid = req.params.projectid;
  Project.findById(projectid, function (err, project) {
    if (err) {
      console.log('uh nuh')
    } else if (!project){
      console.log("falsy project", project)
    } else {
      project.contributions.push({name: name, amount: amount})
      project.save(function(err) {
        if (err) {
          console.log(err)
        } else {
          res.json({
            project
          })
        }
      })
      // var contributionTotal = 0;
      // project.contributions.forEach(function(contribution) {
      //   contributionTotal = contributionTotal + contribution.amount
      // })
      // console.log('contributionTotal', contributionTotal)
      // if (contributionTotal >= project.goal) {
      //   Project.findOneAndUpdate(projectid, {completed: true}, function(err, project) {
      //     if (err) {
      //       console.log(err)
      //     } else {
      //       console.log('check the db')
      //     }
      //   })
      //}


    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  var projectid = req.params.projectid
  Project.findById(projectid, function(err, project) {
    res.render('editProject', {
      project: project
    })
  })
})

router.post('/project/:projectid/edit', function(req, res) {
  var projectid = req.params.projectid
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.start,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }, function(err, project) {
      if (err) {
        res.render('editProject', {
          project: project
        })
      } else {
        Project.find(function(error, projects) {
          if (error) {
            res.status(500).json(error)
          } else {
            console.log(projects)
            res.render('index', {
              projects: projects
            })
          }
        })
      }
    });
})

module.exports = router;
