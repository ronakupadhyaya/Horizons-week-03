"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var bodyParser = require('body-parser');

//TESTIN

router.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json 
router.use(bodyParser.json())

// Example endpoint
router.get('/create-test-project', function (req, res) {
  var project = new Project({
    title: 'I am a test project'
  });
  project.save(function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send('Success: created a Project object in MongoDb');
    }
  });
});


// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function (req, res) {
  var sort = req.query.sort;
  var sortDirection = req.query.sortDirection;
  if (sort) {
    if (sort === "totalCont") {
      Project.find(function (error, projects) {
        var sortByCont = function (a, b) {
          if (sortDirection === "ascending")
            return getTotalContributions(a) - getTotalContributions(b);
          else
            return getTotalContributions(b) - getTotalContributions(a);
        }
        projects.sort(sortByCont);
        res.render('index', {
          projects: projects
        })
      })
    } else if (sort === "fundingStatus") {
      Project.find(function (error, projects) {
        var newArray = [];
        for (var i = 0; i < projects.length; i++) {
          var element = projects[i];
          if (sortDirection === 'complete') {
            console.log('1')
            if (getTotalContributions(element) >= parseInt(element.goal)) {
              console.log('2')
            }
          }
          if (sortDirection === 'complete' && getTotalContributions(element) >= parseInt(element.goal)) {
            newArray.push(element);
          } else if (sortDirection === 'incomplete' && getTotalContributions(element) < parseInt(element.goal)) {
            newArray.push(element);
          }
        }
        console.log(newArray)
        res.render('index', {
          projects: newArray
        })
      })
    } else {
      var sortObject = {}
      if (sortDirection === "ascending")
        sortObject[sort] = 1;
      else
        sortObject[sort] = -1;
      Project.find({}).sort(sortObject).exec(function (err, array) {
        res.render('index', {
          projects: array
        })
      })
    }
  } else {
    Project.find(function (error, projects) {
      res.render('index', {
        projects: projects
      })
    })
  }
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function (req, res) {
  // YOUR CODE HERE
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function (req, res) {
  // YOUR CODE HERE
  var body = req.body;
  var title = body.title;
  var goal = body.goal;
  var description = body.description;
  var category = body.category;
  console.log(category)
  var start = body.start;
  var end = body.end;
  if (!(title && goal && start && end)) {
    res.render('new', {
      error: "Some of the fields are empty.",
      title: title,
      goal: goal,
      description: description,
      category: category,
      start: start,
      end: end
    })
  } else {
    var newProject = new Project({
      title: title,
      goal: goal,
      description: description,
      category: category,
      start: start,
      end: end
    })
    newProject.save(function (error) {
      if (error) {
        res.send('Creating a new project has failed..')
      } else {
        res.redirect('/');
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function (req, res) {
  // YOUR CODE HERE
  var projectId = req.params.projectid;
  Project.findById(projectId, function (error, project) {
    if (project) {
      var totalContributions = 0;
      for (var i = 0; i < project.contributions.length; i++) {
        totalContributions += parseInt(project.contributions[i].amount);
      }
      var percentComplete = totalContributions / project.goal * 100;
      res.render('project', {
        project: project,
        totalContributions: totalContributions,
        percentComplete: percentComplete
      })
    } else {
      res.send('The specified project was not found..')
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function (req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function (error, project) {
    if (project) {
      console.log(project);
      project.contributions.push({
        amount: req.body.amount,
        name: req.body.name
      });
      project.save(function (error) {
        if (!error) {
          console.log('Saved successfully!')
          res.redirect('/project/' + project._id);
        } else {
          console.log('Failed to save contribution..', error)
        }
      });
    } else {
      console.log('Invalid Project ID..')
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function (request, response) {
  Project.findById(request.params.projectid, function (error, project) {
    if (project) {
      response.render('editProject', {
        project: project,
        start: project.start.toJSON().slice(0, 10),
        end: project.end.toJSON().slice(0, 10)
      })
    } else {
      response.send('The project ID does not exist..')
    }
  })
})
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function (request, response) {
  var body = request.body;
  Project.findByIdAndUpdate(request.params.projectid, {
    title: body.title,
    goal: body.goal,
    description: body.description,
    category: body.category,
    start: body.start,
    end: body.end
  }, function (success) {
    response.redirect('/')
  })
})

router.get('/project/:projectid/delete', function (request, response) {
  var body = request.body;
  Project.findByIdAndRemove(request.params.projectid, function (success) {
    response.redirect('/')
  })
})

module.exports = router;

var getTotalContributions = function (project) {
  var total = 0
  for (var i = 0; i < project.contributions.length; i++)
    total += parseInt(project.contributions[i].amount)
  return total;
}
