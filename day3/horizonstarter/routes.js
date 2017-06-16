"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// // Example endpoint
// router.get('/create-test-project', function(req, res) {
//   var project = new Project({
//     title: 'I am a test project'
//   });
//   project.save(function(err) {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.send('Success: created a Project object in MongoDb');
//
//     }
//   });
// });

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {

    if (req.query.sort) {
      var sortDirection = req.query.sortDirection || "ascending"
      var sortObject = {};
      sortObject[req.query.sort] = sortDirection;

      Project.find().sort(sortObject).exec(function(err, array) {
        res.render('index', {
          items: array
        });
      });
    } else {
      Project.find(function(err, array) {
        res.render('index', {
          items: array
        });
      });
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
  var project = {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }

  if(project.title&&project.goal&&project.description&&project.start&&project.end&&project.category){
      new Project(project).save(function(err){
        if (err) {
          res.render("new", {
            error: 'oops! we are having trouble saving your info',
            project: project
          })
        }
        else {
          res.redirect('/');
        }
      })
    }
    else {
      res.render("new", {
      error: 'hey babe, mind filling out the entire form?',
      project: project
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project){
    if (err) {
      console.log("no such project exists")
    } else {
      var donated = 0
      project.contributions.forEach(function(donor){
        donated = donated + parseInt(donor.amount);
      }),
      res.render("project", {
        title: project.title,
        goal: project.goal,
        description: project.description,
        category: project.category,
        start: project.start,
        end: project.end,
        donated: donated,
        percent: (donated/project.goal)*100,
        contributions: project.contributions
      })
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project){
    if (err) {
      console.log("no such project exists")
    } else {
      project.contributions.push({
        name: req.body.name,
        amount: req.body.amount
      })
      project.save(function(err, saveProj){
        if (err) {
          console.log('didnt save')
          console.log(err);
        } else {
          var project = saveProj;
          var donated = 0
          project.contributions.forEach(function(donor){
            donated = donated + donor.amount;
          })
          res.render("project", {
            title: project.title,
            goal: project.goal,
            description: project.description,
            category: project.category,
            start: project.start,
            end: project.end,
            donated: donated,
            name: req.body.name,
            amount: req.body.amount,
            percent: (donated/project.goal)*100,
            contributions: project.contributions
          })
        }
      })
    }
  })
});

var datestring = function(d) {
  return d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
}

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get("/project/:projectid/edit", function(req, res){
  var id = req.params.projectid;
  Project.findById(id, function(err, project){
    console.log(id)
    console.log(project)
    console.log(project.start);
    var start = datestring(project.start);
    var end = datestring(project.end);
    if(err){
      console.log("AHHHHHHH" + err);
    } else {
      res.render('editProject', {
        start: start,
        end: end,
        id: id,
        project: project
      });
    }
  })
})
// Create the POST /project/:projectid/edit endpoint
router.post("/project/:projectid/edit", function(req, res){
  var id = req.params.projectid;
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
}, function(err) {
  console.log('OH NO!!!', err);
  res.redirect('/project/' + id)
});
})

router.post('/api/project/:projectid/contribution', function(req, res) {
  var id = req.params.projectid;
  console.log(id);
  Project.findById('id', function(err, project){
    if(err) {
      console.log('u screwed up', err)
    } else {
      console.log(project);
      project.contributions.push({
        name: req.body.name,
        amount: req.body.amount
      })
      project.save(function(err, project){
        if (err) {
          console.log('didnt save', err);
        } else {
            res.json(project.contributions);
          }
        });
      }
    });
});

module.exports = router;
