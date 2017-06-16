"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var categories = ["Famous Muppet Frogs",
"Current Black Presidents",
"The Pen Is Mightier",
"Famous Mothers",
"Drummers Named Ringo",
"1-Letter Words",
'Months That Start With "Feb"',
'How Many Fingers Am I Holding Up',
'Potent Potables'
];
var _=require("underscore")
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
  if(req.query.sort==='totalContributions'){
    Project.find(function(error, tasks){
      if(error){
        console.log("you messed up somewhere")
      }else if(tasks){
        tasks.sort(function(a,b){
          var a_total = a.contributions.reduce(function(c1,c2){
            return c1.amount+c2.amount;
          },0)
          var b_total = b.contributions.reduce(function(c1,c2){
            return c1.amount+c2.amount;
          },0)
          if(a_total < b_total){
            return -1;
          }else if(a_total > b_total){
            return 1;
          }else{
            return 0
          }
        });
        res.render('index',{
          task_array:tasks
        })
      }
    })
  }else if(req.query.sort==='funded'){
    Project.find(function(error,tasks){
      if(error){
        console.log("you messed up somewhere")
      }else if(tasks){
        tasks.sort(function(a,b){
          var a_total = a.contributions.reduce(function(c1,c2){
            return c1.amount+c2.amount;
          },0)
          var b_total = b.contributions.reduce(function(c1,c2){
            return c1.amount+c2.amount;
          },0)
          if(a_total <= a.total){
            return -1;
          }else{
            return 1;
          }
        });
        res.render('index',{
          task_array:tasks
        })
      }
    })
  }else if(req.query.sort){
    var sortObject = {};
    if(req.query.sortDirection==="on"){
      sortObject[req.query.sort] = -1;
    }else{
      sortObject[req.query.sort] = 1;
    }

    Project.find().sort(sortObject).exec(function(error,tasks){
      if(error){
        console.log('bad request')
      }else if(tasks){
        res.render('index',{
          task_array:tasks
        })
      }
    })}else{
      Project.find(function(error,tasks){
        if(error){
          console.log('bad request')
        }else if(tasks){
          res.render('index',{
            task_array:tasks
          })
        }
      })
    }

  });

  // Part 2: Create project
  // Implement the GET /new endpoint
  router.get('/new', function(req, res) {
    res.render('new',{
      categories:categories
    });
  });

  // Part 2: Create project
  // Implement the POST /new endpoint
  router.post('/new', function(req, res) {
    req.check("title","title was not entered").notEmpty();
    req.check("goal","goal was not entered").notEmpty();
    req.check("start","start date was not entered").notEmpty();
    req.check("end","end date was not entered").isAfter(req.body.start);

    var errors = req.validationErrors();
    var error_object = {
      title:null,
      goal:null,
      description:null,
      start:null,
      end:null
    };
    console.log(errors)
    if(errors){
      errors.forEach(function(error){
        error_object[error.param] = error.msg
      })
      // res.status(400).send("incomplete information provided.")
      console.log("cat",categories)
      res.render('new',{
        error_object:error_object,
        categories:categories
      })
    }else{
      var project_object = new Project({
        title:req.body.title ,
        goal:req.body.goal,
        description:req.body.description,
        start:req.body.start,
        end:req.body.end,
        category:req.body.category
      })
      console.log(req.body.end)
      project_object.save(function(error, task){
        if(error){
          console.log("Save unsuccessful");
        }else(
          res.redirect("/")
        )
      })
    }
  });

  // Part 3: View single project
  // Implement the GET /project/:projectid endpoint
  router.get('/project/:projectid', function(req, res) {
    var project_id = req.params.projectid;
    Project.findById(project_id, function(err,task){
      if(err){
        console.log("the project cannot be found.")
      }else if(task){
        var sum = task.contributions.reduce(function(a,b){
          return a + (+b.amount)
        },0)
        var percentage = sum / task.goal * 100;
        res.render('project',{
          task:task,
          sum:sum,
          percentage: percentage
        })
      }
    })
  });

  // Part 4: Contribute to a project
  // Implement the POST /project/:projectid endpoint
  router.post('/project/:projectid', function(req, res) {
    var project_id = req.params.projectid;
    Project.findById(project_id, function(err,project){
      if(err){
        console.log("the project cannot be found 2.")
      }else if(project){
        project.contributions.push({
          name:req.body.name,
          amount:req.body.amount
        })
        project.save(function(err,suc){
          if(err){
            console.log("I was unable to save it")
          }else{
            res.redirect('/project/'+project_id)
          }
        })
      }
    })
  });

  // Part 6: Edit project
  // Create the GET /project/:projectid/edit endpoint
  // Create the POST /project/:projectid/edit endpoint
  router.get('/project/:projectid/edit', function(req,res){
    var project_id = req.params.projectid;
    Project.findById(project_id, function(err,project){
      if(err){
        console.log("incorrect Id")
      }else if(project){
        res.render('editProject',{
          project:project,
          start_date:project.start.toISOString().substring(0,10),
          end_date:project.end.toISOString().substring(0,10),
          categories:categories
        })
      }
    })
  })
  router.post('/project/:projectid/edit',function(req,res){
    var project_id = req.params.projectid;
    Project.findByIdAndUpdate(projectid,{
      title:req.body.title ,
      goal:req.body.goal,
      description:req.body.description,
      start:req.body.start,
      end:req.body.end,
      category:req.body.category
    }, function(err){
      if(err){
        console.log("failed to update project")
      }console.log("Successfull save")
    })
  })


  module.exports = router;
