"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var app = express();
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
        ].join('-');
};

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
  if (req.query.sort === 'contributions') {
    var sortDirection;
    if (req.query.sortDirection) {
      sortDirection = req.query.sortDirection;
    } else {
      sortDirection = 1;
    }
    Project.find(function(error, projects) {
      projects.sort(function(project1,project2) {
        var projectTotal1 = 0;
        var projectTotal2 = 0;
        project1.contributions.forEach(function(ele) {
          projectTotal1 += ele.amount;
        })
        project2.contributions.forEach(function(ele) {
          projectTotal2 += ele.amount;
        })
        return projectTotal1 > projectTotal2 ? sortDirection: -sortDirection;
      })
      res.render('index', {projects:projects});
    })
  } else if (req.query.sort === 'fullyfunded') {
    Project.find(function(error, projects) {
      var newProject = [];
      projects.forEach(function(project) {
        var projectTotal = 0;
        project.contributions.forEach(function(ele) {
          projectTotal += ele.amount;
        })
        if (projectTotal >= project.goal) {
          newProject.push(project)
        }
      })
      res.render('index', {projects:newProject});
    })
  } else if (req.query.sort === 'notfullyfunded') {
    Project.find(function(error, projects) {
      var newProject = [];
      projects.forEach(function(project) {
        var projectTotal = 0;
        project.contributions.forEach(function(ele) {
          projectTotal += ele.amount;
        })
        if (projectTotal < project.goal) {
          newProject.push(project)
        }
      })
      res.render('index', {projects:newProject});
    })
  } else if (req.query.sort) {
    var sortObject = {};
    if (req.query.sortDirection) {
      sortObject[req.query.sort] = req.query.sortDirection;
    } else {
      sortObject[req.query.sort] = 1;
    }
    Project.find().sort(sortObject).exec(function(err, array) {
      res.render('index', {projects:array});
    });
  } else {
    Project.find(function(error, projects) {
      res.render('index', {projects:projects});
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
  if (req.validationErrors()) {
    res.render('new')
  } else {
    var newProject = new Project({title: req.body.title, goal: req.body.goal, description: req.body.textarea, start: req.body.start, end: req.body.end, category: req.body.projectlist});
    newProject.save(function(error,project) {
      if (error) {
        console.log("you messed up");
      } else {
        res.redirect('/');
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(error, project) {
    if (error) {
      console.log("No single project could be found.")
    } else {
      console.log('IWJGEOJIGWIOJFIOJFWFWE');
      console.log(project);
      var projectTotal = 0;
      project.contributions.forEach(function(ele) {
        projectTotal += ele.amount;
      })
      var projectPercent = parseInt(projectTotal/project.goal*100, 10);
      var projectWidth = projectPercent > 100 ? 100 : projectPercent;
      res.render('project', {project: project, total: projectTotal, width: projectWidth, contributors: project.contributions, percent: projectPercent});
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
// router.post('/project/:projectid', function(req, res) {
//   var contribution = {name: req.body.name, amount: req.body.contribution};
//   Project.findById(req.params.projectid, function(error, project) {
//     if (error) {
//       console.log("No single project could be found.")
//     } else {
//       project.contributions.push(contribution);
//       project.save();
//       res.redirect('/project/' + req.params.projectid);
//     }
//   })
// });

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(error, project) {
    if (error) {
      console.log("No single project could be found.")
    } else {
      console.log((new Date(project.start)).yyyymmdd());
      res.render('editProject', {
        project:project,
        start: (new Date(project.start)).yyyymmdd(),
        end : (new Date(project.end)).yyyymmdd()});
    }
  })
});

// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.textarea,
    start: req.body.start,
    end: req.body.end,
    category: req.body.projectlist
  }, function(err) {
    if (err) {
      console.log("Project could not be found.")
    } else {
      res.redirect('/project/' + req.params.projectid);
    }
  });
});

router.post('/api/project/:projectId/contribution', function(req, res) {
  var contribution = {name: req.body.name, amount: req.body.contribution};
  Project.findById(req.params.projectId, function(error, project) {
    if (error) {
      console.log("No single project could be found.")
    } else {
      project.contributions.push(contribution);
      project.save(function(err) {
        if (!err) {
          res.json({contribution:contribution});
        }
      });
    }
  })
});



module.exports = router;
