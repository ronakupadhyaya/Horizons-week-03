"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var expressValidator = require('express-validator')
router.use(expressValidator())

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
    var sortObject = {};
    sortObject[req.query.sort] = req.query.sortDirection;
    Project.find().sort(sortObject).exec(function(err, array) {
      res.render('index', {items: array})
    });
  } else if (req.query.totalcontributions) {
      Project.find(function(error, projects) {
        var sortedArray = projects.sort(function(a,b) {
          var totalA = 0
          var totalB = 0
          a.contributions.forEach(function(i) {
            return totalA += i.amount
          })
          b.contributions.forEach(function(i) {
            return totalB += i.amount
          })
          return totalA - totalB
        })

        res.render('index', {items: sortedArray})
      })
  } else if (req.query.funded) {
    Project.find(function(error, projects) {
      var fundedProjects = []
      projects.forEach(function(project) {
        var total = 0
        project.contributions.forEach(function(i) {
          return total += i.amount
        })
        if (total >= project.goal) {
          fundedProjects.push(project)
          return fundedProjects
        }
      })
      res.render('index', {items: fundedProjects})
    })
  } else if (req.query.notFunded) {
    Project.find(function(error, projects) {
      var unFundedProjects = []
      projects.forEach(function(project) {
        var total = 0
        project.contributions.forEach(function(i) {
          return total += i.amount
        })
        if (total < project.goal) {
          unFundedProjects.push(project)
          return unFundedProjects
        }
      })
      res.render('index', {items: unFundedProjects})
    })
  } else {
    Project.find(function(err, projects) {
      res.render('index', {items: projects})
    })
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
  req.checkBody('title', 'Must have title').notEmpty()
  req.checkBody('goal', 'Must have goal').notEmpty()
  req.checkBody('goal', 'Must be number').isInt()
  req.checkBody('start', 'Must have start').notEmpty()
  req.checkBody('end', 'Must have end').notEmpty()
  req.check('category', 'Must have category').notEmpty()
  var errors = req.validationErrors()
  if (errors) {
    res.render('new', {
      errors: errors,
      project: req.body
    })
  } else {
    var project = new Project ({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    })
    project.save(function (err) {
      if (err) {
        res.render('new', {
          errors: errors,
          project: req.body
        })
      } else {
        res.redirect('/')
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var project = Project.findById(req.params.projectid, function(error, project) {
    if (error) {
      res.render('index')
    } else {
      var total = 0
      project.contributions.forEach(function(val){
          total += val.amount;
        })
      var progress = (total/project.goal)*100
      res.render('project', {
        project: project,
        total: total,
        progress: progress
      })
    }
  })

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var project = Project.findById(req.params.projectid, function(error, project) {
    if (error) {
      res.render('index')
    } else {
      // req.check('contribution.name', "Must have name").notEmpty()
      // req.check('contribution.value', "Must have value").notEmpty()
      // req.check('contribution.value', "must be number").isInt()
      var errors = req.validationErrors()
      if (errors) {
        res.render('project', {
          errors: errors,
          project: project
        })
      } else {
        project.contributions.push(req.body)
        project.save(function(err) {
          if (err) {
            res.render('project', {
              errors: "didn't save",
              project: project
            })
          } else {
            var total = 0
            project.contributions.forEach(function(val){
                total += val.amount;
              })
            var progress = (total/project.goal)*100
            res.render('project', {
              project: project,
              success: "successfully contributed",
              total: total,
              progress: progress
            })
          }
        })
      }
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  var project = Project.findById(req.params.projectid, function(error, project) {
    var startDate = project.start.toISOString().substring(0,10)
    var endDate = project.end.toISOString().substring(0,10)
    res.render('editProject', {
      project: project,
      startDate: startDate,
      endDate: endDate
    })
  })
})
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  var project = Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title
  }, function(err, project) {
    res.redirect('/project/' + req.params.projectid)
    console.log(err)
  })
})

module.exports = router;
