"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var Total = require('./models').Total;
var strftime = require('strftime');


router.post('/api/project/:projectId/contribution', function(req, res) {

  var projectID = req.params.projectId;

  Project.findById(projectID, function(err, found){
    if(!err){
      found.contributions.push({name: req.body.name, amount: req.body.amount});
      found.save(function(error, result){
        if(error){
        }
        else {
          Total.findById("59435eeef36d282882bac1fe", function(err, totalDB) {
            if (err) {
              console.log(err)
            } else {
                totalDB.totalAmount += req.body.amount;
                totalDB.save(function(err2, conf) {
                  if (err2) {
                    console.log(err2);
                  } else {
                    console.log("DB Total saved")
                  }
                })
              }
          });
          res.json({name: req.body.name, amount: req.body.amount});
        }
      });
    }
    else {
      console.log(err);
    }
  });
});

function getTotal() {
  return function(){Total.findById("59435eeef36d282882bac1fe").lean().exec(function(err, totalDB) {
      if (err) {
        return null;
      } else {
         var x = totalDB;
        return x.totalAmount;
      }
    });
  }();
}


// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({
    title: 'I am a test project'
  });
});

router.post("/", function(req, res) {
  Project.find(function(err, projects) {
    if (!err) {
      console.log("found");
      console.log(projects);
      res.json({
        projects: projects,
        test: "hi"
      });
    } else {
      console.log(err);
    }
  });
});

router.get('/', function(req, res) {
  Project.find(function(err, array){
    if (!err) {
      res.render('index', {items: array});
    } else {
      console.console.log(err);
    }
  });
});

router.get('/new', function(req, res) {
  res.render("new");
});

router.post('/new', function(req, res) {
  req.checkBody('title', 'Title must not be empty').notEmpty();
  req.checkBody('goal', 'Goal must not be empty').notEmpty();
  req.checkBody('goal', 'Goal must be an integer').isInt();
  req.checkBody('description', 'Description must not be empty').notEmpty()
  req.checkBody('start', 'Start date must not be empty').notEmpty();
  req.checkBody('start', 'Start date must be a date').isDate();
  req.checkBody('end', 'End date must not be empty').notEmpty();
  req.checkBody('end', 'End date must be a date').isDate();
  var errors = req.validationErrors();
  if (!errors){
    var temp = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
    temp.save(function(err, result){
      if(!err){
        res.redirect('/');
      }
    })
  } else {
    console.log(errors)
    res.render('new', {
      errors: errors
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projectID = req.params.projectid;
  Project.findById(projectID, function(err, found){
    if(!err){
      var goal = found.goal;
      var sum = 0;
      for (var i = 0; i < found.contributions.length ; i++){
        sum += found.contributions[i].amount;
      }
      var percentage = sum/goal;

      res.render('project',{
        project: found,
        projectID: projectID,
        contributions: found.contributions,
        sum: sum,
        percentage: percentage
      });
    }
    else {
      console.log(err);
    }
  });

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  req.checkBody('name', 'Name must not be empty').notEmpty();
  req.checkBody('amount', 'Amount must not be empty').notEmpty();
  req.checkBody('amount', 'Amount must be an integer').isInt();
  var errors = req.validationErrors();

  var projectID = req.params.projectid;

  Project.findById(projectID, function(err, found){
    if(!err){
      if (!errors){
        found.contributions.push({name: req.body.name, amount: req.body.amount});
        found.save(function(err, result){
          if(err){
            console.log(err);
          } else {
            res.redirect('/project/'+projectID);
          }
        });
      } else {
        console.log(errors)
        res.render('project', {
          errors: errors,
          project: found,
          projectID: projectID
        })
      }
    }
    else {
      console.log(err);
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res){
  var projectID = req.params.projectid;
  Project.findById(projectID, function(err, found){
    res.render('editProject', {
      project: found,
      start_date: found.start.toString(),
      end_date: found.end.toString()
    });
  });
});

router.post('/project/:projectid/edit', function(req, res){
  Project.findById(req.params.projectid, function (err, p) {
    p.title = req.body.title
    p.goal = req.body.goal
    p.description = req.body.description
    p.start = req.body.start
    p.end = req.body.end

    p.save(function(err){if(err){res.status(500).json(err);}
    res.redirect('/project/'+req.params.projectid)
  });
});
});


module.exports = router;
