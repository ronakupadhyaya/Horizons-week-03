"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');



// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({
    title: 'I am a test project CLOWN'
  });
  project.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send('Success: created a Project object in MongoDb');
    }
  });
});


router.get('/c',function(req,res) {
  res.render('clown');
})

// Exercise 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {

    Project.find(function(err,array) {
      if(err) {
        throw 'errorSilly'
      } else {
      res.render('index',{items:array});
    }
  });

  // YOUR CODE HERE
});



// Exercise 2: Create project
// Implement the GET /new endpoint


router.get('/new',function(req,res) {
  res.render('new')
})







router.post('/new',function(req,res) {

var newProj=req.body
   var project = new Project( {
     title: newProj.title,
     goal: parseInt(newProj.goal),
     description: newProj.description,
     start: new Date(newProj.start),
     end:   new Date(newProj.end)
   });


  project.save(function(err) {
    if (err) {
      console.log('noclowns')
      res.status(500).json(err);
    } else {
      res.redirect('/')
    }
  });

})
// Exercise 2: Create project
// Implement the POST /new endpoint
// router.post('/new', function(req, res) {
//   // YOUR CODE HERE
// });// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id=req.params.projectid;
  Project.findById(id,function(err,pro) {
    if(err) {
      console.log('err')
    } else{

      res.render('project', {project:pro})
      }
    });
  })

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
    Project.findById(req.params.projectid, function(err,pro) {
      if(err) {
        console.log('errorsilly')
      } else {
        console.log(req.body)
        console.log('party')
        pro.contributions.push(req.body)
        console.log(pro)
        pro.save(function(err) {
          if(err) {
            console.log('noSave')
          } else {
            var total=0
            total+=item.amount;
              res.render('project', {project:pro,
                                   totalcont:total})
          }
        });
      };
    });
  });



// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
