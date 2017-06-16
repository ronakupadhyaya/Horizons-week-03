"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Implement the GET / endpoint.
router.get('/', function(req, res) {
  var sortObject = {};
  var sortType = req.query.sort || 'start'
  var sortDirection = req.query.sortDirection || "ascending"
  var fundedBool = req.query.funded

  if(sortType==='totalContribution') {
    Project.find(function(err, array){
      if(err)console.log(err);
      sortByTotalContribution(array, sortDirection);
      render(array)
    });
  } else {
    sortObject[sortType] = sortDirection==='descending' ? -1 : 1;
    Project.find().sort(sortObject).exec(function(err, array) {
      if(err)console.log(err);
      render(array)
    });
  }
  function render(array) {
    if(fundedBool) {
      fundedBool = JSON.parse(req.query.funded);
      applyFundingFilter(array, fundedBool)
    }
    res.render('index', {
      projects: array,
      sort_direction: sortDirection,
      sort_type: sortType
    })
  }
});

// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  var categories = Project.schema.path('category').enumValues;
  res.render('new', {
    categories: categories
  })
});

// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  //check POST body contents
  req.check('title', 'no title').notEmpty()
  req.check('goal', 'no goal').notEmpty()
  req.check('start', 'no start date').notEmpty()
  req.check('end', 'no end date').notEmpty()

  //re-render if errors
  var errors = req.validationErrors();
  if (errors) {
    console.log("A user didn't fill the inputs");
    res.render('new', {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      categories: Project.schema.path('category').enumValues,
      error: true
    })
  } else {
    //save new project and go back to main page
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category

    })
    project.save(function(err) {
      console.log("Saved project: ", project.title);
      if (err) console.log("Error saving project", err);
      res.redirect('..')
    })
  }
});

// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    res.render('project', {
      project: found,
      totalContribution: totalContribution(found),
      percentage: 100*totalContribution(found)/found.goal
    })
  })
})

// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    if (err) console.error(err);
    found.contributions.push({name:req.body.name,amount:parseInt(req.body.amount)})
    found.save(function(err) {
      if (err) console.log(err);
      res.redirect('#')
    })
  })
});

// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log(err);
    }
    res.render('editProject', {
      title: found.title,
      goal: found.goal,
      description: found.description,
      start: found.start,
      end: found.end,
      categories: Project.schema.path('category').enumValues,
      error: !!err
    })
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
  }, function(err) {
    if (err) console.log(err);
  })
})

// Utility funcitons

// Calculate total contribution to a project
function totalContribution(project) {
  var total = 0
  project.contributions.forEach(function(donation){
    total += donation.amount
  })
  return total
}
// Sort an array of projections by the sum of the contributions
function sortByTotalContribution(arr, direction) {
  arr.sort(function(a,b) {
    return totalContribution(a) + totalContribution(b)
  })
  if (direction==="descending") {
    arr.reverse()
  }
}
// Apply a funding filter
// fundedBool is true for filtering out un-funded projects
function applyFundingFilter(array, fundedBool) {
  var length = array.length
  var index = 0
  for (index; index < length; ){
    var project = array[index]
    if (totalContribution(project)>=project.goal && !fundedBool ||
        totalContribution(project)<=project.goal && fundedBool) {
      array.splice(index,1)
      length--
    } else {
      index++
    }
  }
}


module.exports = router;
