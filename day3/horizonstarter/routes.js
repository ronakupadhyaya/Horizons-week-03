"use strict";

var options = ['Famous Muppet Frogs', 'Current Black Presidents', 'The Pen is Mightier', 'Famous Mothers', 'Drummers Named Ringo', '1-Letter Words', 'Months That Start With Feb', 'How Many Fingers Am I Holding Up', 'Potent Potables'];
// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

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
  if(req.query.sort == "descending"){
    Project.find().sort({start: -1}).exec(function(err, project_arr){
      if(err){
        console.log("ERROR IN GET /");
      }else{
        res.render('index', {
          project_arr: project_arr
        });
      }

    });
  }

  Project.find().sort({start: 1}).exec(function(err, project_arr){
    if(err){
      console.log("ERROR IN GET /");
    }else{
      res.render('index', {
        project_arr: project_arr
      });
    }
  });

});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {
    options: options
  });
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {

  if(req.body.title && req.body.goal && req.body.start && req.body.end){

    var my_post = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    });

    my_post.save(function(err){
      if(err){
        console.log("ERROR SAVING", err);
      }else{
        console.log("POST SUCCESSFUL");
      }
    });
    res.redirect('/');
  }else{
    var title = (req.body.title) ? req.body.title : "Error: title required";
    var goal = (req.body.goal) ? req.body.goal : "Error: goal required";
    var start = (req.body.start) ? req.body.start : "Error: start required";
    var end = (req.body.end) ? req.body.end : "Error: end required";

    console.log("ERROR NOT COMPLETE");

    res.render('new', {
      title: title,
      goal: goal,
      description: req.body.description,
      start: start,
      end: end,
      options: options
    });

  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, project){
    if(err){
      console.log("ERROR in GET /project/:projectid");
      res.sendStatus(404);
    }else{
      // default is undefined (won't show up if undefined)
      var totalAmount;
      var percentage;

      if(project){

        if(project.contributions.length > 0){
          totalAmount = 0;
          project.contributions.forEach(function(val){
            totalAmount += val.amount;
          })
          percentage = totalAmount/project.goal * 100;
        }

        res.render('project', {
          project: project,
          totalAmount: totalAmount,
          percentage: percentage
        });

      }else{
        res.sendStatus(404);
      }
    }
  })
});

// Part 4: Contribute to a project
// Implement the POST /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // get id
  var id = req.params.projectid;

  // find project document via id
  Project.findById(id, function(err, project){
    if(err){
      console.log("ERROR in POST /post/:projectid");
      res.sendStatus(404);
    }else{
      project.contributions.push({name: req.body.name, amount: req.body.amount});
      project.save();
      res.redirect(`/project/${id}`);
    }
  });


});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res){
  // find project document via id
  var id = req.params.projectid;

  Project.findById(id, function(err, project){
    if(err){
      console.log("ERROR in GET /project/:project/edit");
      res.sendStatus(404);
    }
    var start = project.start.toISOString().substring(0,10);
    var end = project.end.toISOString().substring(0,10);
    console.log("category is", project.category)

    res.render('editProject', {
      project: project,
      options: options,
      start: start,
      end: end
    });

  });

});

router.post('/project/:projectid/edit', function(req, res){
  var id = req.params.projectid;

  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }, function(err){
    console.log(err);
    console.log("UPDATE FAILED in POST /project/:projectid/edit");
  });

  res.redirect('/project/'+ id);
});

// AJAX STUFFS

router.post('/api/project/:projectId/contribution', function(req, res){
  var id = req.params.projectId;

  Project.findById(id, function(err, project){
    if(err){
      console.log("ERROR in POST /post/:projectid");
      res.sendStatus(404);
    }else{
      if(project){
        // check if amount is an integer
        if(isNaN(req.body.amount) || req.body.amount < 0 || req.body.amount < 1){
          res.status(400).json('amount not valid');
          return;
        }

        project.contributions.push({name: req.body.name, amount: req.body.amount});
        project.save();
        res.json(project.contributions);
      }else{
        console.log("error, project doesn't exist");
      }
    }
  });

});

router.get('/api/projects', function(req, res){
  console.log('HIT THE API')
  Project.find(function(err, project_arr){
    if(err){
      console.log("error in GET /api/projects", err);
      res.sendStatus(404);
    }
    var status = req.query.funded;

    if(status === 'false'){
      console.log("query for not funded");
      project_arr = project_arr.filter(function(project){
        var totalAmount = 0;
        project.contributions.forEach(function(val){
          totalAmount += val.amount;
        });
        return totalAmount < project.goal;
      });
    }

    if(status === 'true'){
      console.log("query for funded");
      project_arr = project_arr.filter(function(project){
        var totalAmount = 0;
        project.contributions.forEach(function(val){
          totalAmount += val.amount;
        });
        return totalAmount >= project.goal;
      });
    }

    res.json({project_arr: project_arr});
  });
});


module.exports = router;
