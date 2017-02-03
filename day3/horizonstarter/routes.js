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

router.get('/', function(req, res) {

  if(req.query.sort){
    if(req.query.sort === 'goal'){
      var sortObject = {};
      req.query.sortDirection === 'decreasing' ? sortObject[req.query.sort] = -1: sortObject[req.query.sort] = 1;
      Project.find().sort(sortObject).exec(function(err, array){
        if(err){
          console.log("error", err)
        }
        console.log("I made it here");
        res.render('index', {items: array})
      });
    }

    if(req.query.sort === 'start'){
      var sortObject = {};
      req.query.sortDirection === 'decreasing' ? sortObject[req.query.sort] = -1: sortObject[req.query.sort] = 1;
      Project.find().sort(sortObject).exec(function(err, array){
        if(err){
          console.log("error", err)
        }
        res.render('index', {items: array})
      });
    }


    if(req.query.sort === 'end'){
      var sortObject = {};
      req.query.sortDirection === 'decreasing' ? sortObject[req.query.sort] = -1: sortObject[req.query.sort] = 1;
      Project.find().sort(sortObject).exec(function(err, array){
        if(err){
          console.log("error", err)
        }
        res.render('index', {items: array})
      });
    }
  } else {

    Project.find(function(err, arr){ //second thing is result
      if(err){
        console.log("there's an error");
      }
      res.render('index', {items: arr}); //should be callback object

    })
  }
})


// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {
    categories: Project.schema.path('category').enumValues.map(function(thing) {
      return {value: thing} //I want to go through each item in Categories array and populate the dropdown menu
      // where "thing" is each category in enum -- we're essentially just making an object of enum values with key "values"
    })
  });
})

// Exercise 2: Create project
// Implement the POST /new endpoint

function validate(req){
  req.checkBody('title', 'Invalid').notEmpty();
  req.checkBody('goal', 'Invalid').notEmpty();
  req.checkBody('description', 'Invalid').notEmpty();
  req.checkBody('start', 'Invalid').notEmpty();
  req.checkBody('end', 'Invalid').notEmpty();

}

router.post('/new', function(req, res) {
  validate(req);
  var err = req.validationErrors();
  if (err) {
    console.log("error", err)
  } else {
    // console.log(req.body.enumValues);
    // var category = Project.path('category').enumValues
    // console.log(category);

    var newProject = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    });
    newProject.save(function(err){
      console.log("save")
      if (err){
        console.log("error", err);

      }
      res.redirect('/');
      //  res.render('/', {data: newProject})
    })


    // res.render('new');
  }
})

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // console.log("whee");
  Project.findById(req.params.projectid, function(err, project){
    console.log(req.params.projectid);
    console.log('123');
    if(err){
      console.log("error finding project", err)
    } else {
      console.log(project);
      res.render('project', {project:project}) //the key here could be anything, and should be used in the handlebars in project
    }
  })
})

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project){
    if(err){
      // console.log(this[project][contribution]);
      console.log("error finding project", err)
    } else {

      // var newContribution = req.body;
      var newContribution = {
        name: req.body.name,
        amount: req.body.contributions
      }
      project.contributions.push(newContribution);
      project.save(function(err){
        if (err){
          console.log(err)
        }

        var total = 0;
        project.contributions.forEach(function(item){
          total += item.amount;
        });

        var percent = total/project.goal*100
        if(percent> 100){
          percent = 100;
        }

        res.render('project', {project:project, total:total, percent:percent})
        //res.redirect('project', {project:project});
      })
    }
  })
})

function pad(num) {
  var norm = Math.abs(Math.floor(num));
  return (norm < 10 ? '0' : '') + norm;
}

function toDateStr(date) {
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate() + 1);
}

router.get('/project/:projectid/edit', function(req, res){
  Project.findById(req.params.projectid, function(err, project){
    if(err){
      // console.log(this[project][contribution]);
      console.log("error finding project", err)
    } else {
      res.render('editProject', {project:project, start: toDateStr(new Date(project.start)), end: toDateStr(new Date(project.end))
      })
    }
  })
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.post('/project/:projectid/edit', function(req, res){
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }, function(err, project) {
    if(err){
      console.log("error", err)
    }
    res.redirect('/');

  })
  // YOUR CODE HERE
})


// router.get('/sort', function(req, res){
//   if()
// }

// router.get('/sortDirection', function(req, res){


router.post('/api/project/:projectId/contribution', function(req, res){
  Project.findById(req.params.projectid, function(err, project){
    if(err){
      // console.log(this[project][contribution]);
      console.log("error finding project", err)
    } else {
      var newContribution = {
        name: req.body.name,
        amount: req.body.contributions
      }
      project.save(function(err){
        if (err){
          console.log(err)
        } else {
          res.json(req.body);
        }

      })

    }
  })
})


module.exports = router;
