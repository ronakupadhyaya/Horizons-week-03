"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

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


  var sortDir = 1;
  if (req.query.sortDirection === "asc") {
    sortDir = -1;
  }
  if (req.query.sortDirection === "dec") {
    sortDir = 1;
  }
  var sort = req.query.sort;
  if (req.query.sort) {
    var sortObject = {};
    sortObject[req.query.sort] = sortDir;
    Project.find().sort(sortObject).exec(function (err, array) {
      res.render("index", {
        items: array,
        dir: req.query.sortDirection,
        sort: sort
      });
    });
  } else {
    Project.find(function (err, array) {
      res.render('index', {
        items: array
      });
    });

  }

});

router.get('/funded/:flag', function (req, res) {

  if (req.params.flag === "true") {
    Project.find(function (err, array) {
      console.log(array);
      array = array.filter(function (item) {
        console.log(item);
        return item.totalcontribution >= item.goal;
      });
      res.render('index', {
        items: array
      });
    });
  } else {
    Project.find(function (err, array) {
      array = array.filter(function (item) {
        return item.totalcontribution <= item.goal;
      });
      res.render('index', {
        items: array
      });
    });

  }

})
// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function (req, res) {
  res.render('new', {});
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function (req, res) {

  req.checkBody('title', 'must add title').notEmpty();
  req.checkBody('goal', 'must add body').notEmpty();
  req.checkBody('description', 'must add desectiption').notEmpty();
  req.checkBody('start', 'must add date').notEmpty();
  req.checkBody('end', 'must add date').notEmpty();
  if (req.validationErrors()) {
    res.render('new', {
      title: "please fill this correctly",
      goal: "please fill this correctly",
      description: "please fill this correctly",
      date: "please fill this correctly",
      date2: "please fill this correctly",
    });

  } else {
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category,
      totalcontribution: 0
    });
    project.save(function (err) {
      if (err) {
        console.log("error ins project save", err);
      } else {

        res.redirect('/');
        console.log("projsect was logged")
      }
    });
  }

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function (req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function (err, projectTmp) {
    if (err) {
      console.log("err in findById")
    }
    var totalcontribution = 0;
    projectTmp.contributions.forEach(function (item) {
      totalcontribution += parseInt(item.amount);
    });
    console.log(totalcontribution);
    console.log(projectTmp.goal);
    var barPrecent = (totalcontribution / projectTmp.goal) * 100;
    console.log(barPrecent);
    res.render('project', {
      project: projectTmp,
      barPrecent: barPrecent
    });
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function (req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  var contribution = {
    name: req.body.name,
    amount: req.body.amount
  }
  Project.findById(req.params.projectid, function (err, projectTmp) {
    if (err) {
      res.status(500).json(err);
    }
    projectTmp.totalcontribution += parseInt(req.body.amount);
    projectTmp.contributions.push(contribution);
    projectTmp.save(function (err) {
      if (err) {
        res.status(503).json(err);
      } else {
        res.redirect('/');
        console.log("contribution made")
      }
    })
  });

});




// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function (req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function (err, projectTmp) {
    if (err) {
      console.log("err in findById")
    }
    res.render('editProject', {
      project: projectTmp,
      title: projectTmp.title,
      goal: projectTmp.goal,
      description: projectTmp.description,
      date: projectTmp.start,
      date2: projectTmp.end,
      category: projectTmp.category
    });
  });
});

router.post('/project/:projectid/edit', function (req, res) {
  // YOUR CODE HERE
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
    // YOUR CODE HERE
  }, function (err) {
    // YOUR CODE
    if (err) {
      res.status(500).json(err);
    } else {
      res.redirect("/");
    }
  });

});

module.exports = router;
