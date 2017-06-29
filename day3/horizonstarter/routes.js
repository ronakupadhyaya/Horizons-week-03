"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({
    title: 'I am a test project',
    goal: 30,
    description: 'Testing testing testing',
    start: '1/20/2017',
    end: '2/28/2017'
  });
  project.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send('Success: created a Project object in MongoDb');
    }
  });
});

function formatDates(array) {
  var array2 = []
  for (var i = 0; i < array.length; i++) {
    var obj = {};
    obj.title = array[i].title;
    obj._id = array[i]._id;
    obj.goal = array[i].goal;
    obj.description = array[i].description;
    obj.start = (array[i].start.getMonth() + 1) + "/" + array[i].start.getDate() + "/" + array[i].start.getFullYear();
    obj.end = (array[i].end.getMonth() + 1) + "/" + array[i].end.getDate() + "/" + array[i].end.getFullYear();
    //obj.id = array[i]._id;
    array2.push(obj);
  }
  return array2;
}
// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  // YOUR CODE HERE
  Project.find(function(err, array) {
    if (err) {
      console.log("ERROR", err);
    } else {
      console.log(formatDates(array));
      res.render('index', {
        projects:formatDates(array)
      });
    }
  });
});

function getTodayString() {
  var today = new Date();
  var year = today.getFullYear();
  var date = today.getDate();
  var month = today.getMonth() + 1;
  if (/^\d$/.test(date))  {
    date = "0" + date;
  }
  if (/^\d$/.test(month))  {
    month = "0" + month;
  }
  return year + "-" + month + "-" + date;
}
// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new', {
    start: getTodayString(),
    end: getTodayString()
  });
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  console.log("POST REQUEST TO NEW");
  req.checkBody('title', 'Title field invalid').notEmpty();
  req.checkBody('goal', 'Goal field invalid').isNumber();
  if (req.validationErrors()) {
    var titleError = "";
    var goalError = "";
    req.validationErrors().forEach(function(error) {
      if (error.param === 'title') {
        titleError = error.msg;
      }
    });
    req.validationErrors().forEach(function(error) {
      if (error.param === 'goal') {
        goalError = error.msg;
      }
    });
    console.log("Title error: " + titleError);
    console.log("Goal error: " + goalError);
    res.render('new', {
      title: req.body.title,
      goal: req.body.goal,
      titlePlaceholder: titleError,
      goalPlaceholder: goalError,
      titleHasError: titleError !== '',
      goalHasError: goalError !== '',
      start: getTodayString(),
      end: getTodayString()
    });
  } else {
    new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    }).save(function(err) {
      if (err) {
        console.log("ERROR", err);
      } else {
        console.log("SAVED!");
        Project.find(function(err, array) {
          if (err) {
            console.log("ERROR", err);
          } else {
            console.log(formatDates(array));
            res.render('index', {
              projects:formatDates(array)
            });
          }
        });
      }
    });
  }

});

//for only one project
function formatDates2(project) {
  var obj = {};
  obj.title = project.title;
  obj._id = project._id;
  obj.goal = project.goal;
  obj.description = project.description;
  obj.start = (project.start.getMonth() + 1) + "/" + project.start.getDate() + "/" + project.start.getFullYear();
  obj.end = (project.end.getMonth() + 1) + "/" + project.end.getDate() + "/" + project.end.getFullYear();
  return obj;
}
// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project) {
    console.log("Project: " + project)
    var contributions = project.contributions;
    var numContributions = contributions.length;
    var totalRaised = 0;
    var donators = {};
    contributions.forEach(function(donation) {
      totalRaised += donation.amount;
      if (donators.hasOwnProperty(donation.name)){
        donators[donation.name] += donation.amount;
      } else {
        donators[donation.name] = donation.amount;
      }
    });
    var percentage = (totalRaised/project.goal)*100;
    for (var key in donators) {
      if (donators.hasOwnProperty(key)) {
        console.log("%, $%d\n", key, donators[key]);
      }
    }
    res.render('project', {
      project:formatDates2(project),
      numBackers: Object.keys(donators).length,
      totalRaised: totalRaised,
      percentage: percentage,
      over: totalRaised > project.goal,
      donators: donators
    });
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('contributor', 'Contributor field invalid').notEmpty();
  req.checkBody('amount', 'Amount field invalid').isNumber();
  if (req.validationErrors()) {
    var nameError = "";
    var amountError = "";
    req.validationErrors().forEach(function(error) {
      if (error.param === 'contributor') {
        nameError = error.msg;
      }
    });
    req.validationErrors().forEach(function(error) {
      if (error.param === 'amount') {
        amountError = error.msg;
      }
    });
    for (var i = 0; i < req.validationErrors().length; i++) {
      console.log(req.validationErrors()[i].msg);
    }
    Project.findById(req.params.projectid, function(err, project) {
      res.render('project', {
        project: formatDates2(project),
        nameHasError: nameError !== '',
        amountHasError: amountError !== '',
        amountError: amountError,
        nameError: nameError
      });
    });
  } else {
    //save the donation
    Project.findById(req.params.projectid, function(err, project) {
      if (err) {
        console.log("ERROR", err);
      } else {
        project.contributions.push({name: req.body.contributor, amount: parseFloat(req.body.amount)});
        project.save();
        console.log("Contribution successful!");
        Project.find(function(err, array) {
          if (err) {
            console.log("ERROR", err);
          } else {
            console.log(formatDates(array));
            res.render('index', {
              projects:formatDates(array)
            });
          }
        });
      }
    });
  }
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
