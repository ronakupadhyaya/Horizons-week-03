"use strict";

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
router.get('/', function(req, res){
  Project.find(function(err, array){
    console.log(array);
    res.render('index', {items: array});
  });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // console.log(req.body.title);
  // console.log(req.body.goal);
  // console.log(req.body.start);
  console.log(req.body.category);
  req.checkBody('title','You need an title').notEmpty();
  req.checkBody('goal','You need a goal').notEmpty();
  req.checkBody('start','You need a start date').notEmpty();
  req.checkBody('end','You need a end date').notEmpty();
  req.checkBody('category','You need a end date').notEmpty();
  var result = req.validationErrors();
  if (result){
    res.status(400).render('new',{
      error:'Title, body, category, start date and/or end date cannot be blank!'
    })
  }else if (!result){
    if (req.body.description){
      var project = new Project({
        title: req.body.title,
        goal: req.body.goal,
        description: req.body.description,
        category: req.body.category,
        start: req.body.start,
        end: req.body.end
      });
    }
    else{
      var project = new Project({
        title: req.body.title,
        goal: req.body.goal,
        category: req.body.category,
        start: req.body.start,
        end: req.body.end
      });
    }
    project.save(function(err){
      if(err){
        console.log('could not save', err);

      }else{
        console.log('success');
        res.redirect('/')
        //mongoose.connection.close();
      }
    });
  }

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projectid = req.params.projectid;
  var total = 0;
  var bar = 0;
  Project.findById(projectid, function(err,project){
    if (err){
      console.log("THERE WAS AN ERROR: " + err);
    }else{
      if (project.description || project.contributions){
        project.contributions.forEach(function(item){
          total+=item.amount;
        })
        bar = (total/project.goal)*100;
        if (project.description && project.contributions){
          res.render('project',{
            title: project.title,
            goal: project.goal,
            description: project.description,
            start: project.start,
            end: project.end,
            contributions: project.contributions,
            category: project.category,
            total: total,
            bar:bar
          })
        }else if (project.contributions){
          res.render('project',{
            title: project.title,
            goal: project.goal,
            start: project.start,
            end: project.end,
            contributions: project.contributions,
            category: project.category,
            total:total,
            bar:bar
          })
        }else if (project.description){
          res.render('project',{
            title: project.title,
            goal: project.goal,
            description: project.description,
            start: project.start,
            end: project.end,
            category: project.category,
            total:total,
            bar:bar
          })
        }
      }else{
        res.render('project',{
          title: project.title,
          goal: project.goal,
          start: project.start,
          end: project.end,
          category: project.category,
          total:total,
          bar:bar
        })
      }
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err,project){
    if (err){
      console.log("THERE WAS AN ERROR: " + err);
    }else{
      var obj = {
        name: req.body.name,
        amount: req.body.amount
      }
      project.contributions.push(obj);
      project.save(function(err){
        if(err){
          console.log('could not save', err);

        }else{
          console.log('success');
          res.redirect('/project/'+projectid)
          //mongoose.connection.close();
        }
      });
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit',function(req,res){
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err,project){
    if (err){
      console.log("THERE WAS AN ERROR: " + err);
    }else{
      var newStartDate = project.start.getFullYear()+'-';
      var newEndDate = project.end.getFullYear()+'-';
      var startDay = project.start.getDate();
      var startMonth = project.start.getMonth();
      startMonth++;
      var endDay = project.end.getDate();
      var endMonth = project.end.getMonth();
      endMonth++;
      if (startMonth < 10){
        newStartDate =newStartDate+'0'+startMonth+'-';
      }else{
        newStartDate = newStartDate+startMonth+'-';
      }
      if (startDay < 10){
        newStartDate = newStartDate+'0'+project.start.getDate();
      }else{
        newStartDate = newStartDate+project.start.getDate();
      }
      if (endMonth < 10){
        newEndDate = newEndDate+'0'+endMonth+'-';
      }else{
        newEndDate = newEndDate+endMonth+'-';
      }
      if (endDay < 10){
        newEndDate = newEndDate+'0'+project.end.getDate();
      }else{
        newEndDate = newEndDate+project.end.getDate();
      }
      console.log(newStartDate);
      console.log(newEndDate);

      if (project.description && project.contributions){
        res.render('editProject',{
          title: project.title,
          goal: project.goal,
          description: project.description,
          start: newStartDate,
          end: newEndDate,
          contributions: project.contributions,
          category: project.category
        })
      }else if (project.contributions){
        res.render('editProject',{
          title: project.title,
          goal: project.goal,
          start: newStartDate,
          end: newEndDate,
          contributions: project.contributions,
          category: project.category
        })
      }else if (project.description){
        res.render('editProject',{
          title: project.title,
          goal: project.goal,
          description: project.description,
          start: newStartDate,
          end: newEndDate,
          category: project.category
        })
      }
    else{
      res.render('project',{
        title: project.title,
        goal: project.goal,
        start: newStartDate,
        end: newEndDate,
        category: project.category
      })
     }
    }
  })
})

module.exports = router;
