"use strict";

// Routes, with inline controllers for each route.
module.exports=function(app) {



var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
// app.get('/create-test-project', function(req, res) {
//   var project = new Project({
//     title: 'I am a test project'
//   });
//   project.save(function(err) {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.send('Success: created a Project object in MongoDb');
//     }
//   });
// });

// Part 1: View all projects
// Implement the GET / endpoint.
app.get('/', function(req, res) {
  Project.find(function(err, array) {
    if(err) {
      console.log(err)
    }
    res.render('index', {allProjects: array});
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
app.get('/new', function(req, res) {
  res.render('new', {})
});

// Part 2: Create project
// Implement the POST /new endpoint
app.post('/new', function(req, res) {
  console.log(req.body)

  // if(!req.body.title || !req.body.goal || !req.body.description || !req.body.start || !req.body.end){
  //     res.status(400).send("Please fill out all the fields")
  //   }

var project =new Project({
              title: req.body.title,
              goal: req.body.goal,
              description: req.body.description,
              start: req.body.start,
              end: req.body.end
            })

            project.save(function(err) {
              if (err) {
                res.status(500).json(err);
              } else {
                res.redirect('/')
              }
            });

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
app.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, projectObj) {
    if(err) {
      console.log(err)
    }
    res.render('project', {
      items: projectObj,
      id: req.params.projectid
    });
  })
});

// Part 4: Contribute to a project
// Implement the POST /project/:projectid endpoint
app.post('/project/:projectid', function(req, res) {

  Project.findById(req.params.projectid, function(err, current) {
  if(err) {
    console.log(err)
  }


var contObj = {}
contObj.name = req.body.name
contObj.amount = req.body.amount

current.contributions.push(contObj)

  Project.where({ _id: current.id }).update({ $set: { contributions: current.contributions }, function (err, updated) {

    res.send("success")
  }})

// proj.save(function(err, contArray) {
//   res.render("project", {
//     proj: proj
//   })
// })


              // project.save(function(err) {
              //   if (err) {
              //     res.status(500).json(err);
              //   } else {
              //     res.redirect('/')
              //   }
              // });
  })
})

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

};
