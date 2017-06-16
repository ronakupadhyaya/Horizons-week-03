"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Setting up express validator 
var validator = require('express-validator'); 
router.use(validator()); 

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
  // YOUR CODE HERE
  var sortObject = {};
  if (req.query.sort) {
        if (req.query.sort!=='totalContributions') {
            if (!req.query.sortDirection) 
                sortObject[req.query.sort]='asc' 
            else 
                sortObject[req.query.sort] = req.query.sortDirection; 
              
            Project.find().sort(sortObject).exec(function(err, projects) {
              res.render('index', {projects: projects})
            })
        } else {
           Project.find(function(err, projects){
            projects.sort(function(a, b) {
              var totalA = 0; 
              var totalB = 0; 
              a.contributions.forEach(function(donation) {
                totalA+=donation.amount; 
              })
               b.contributions.forEach(function(donation) {
                totalB+=donation.amount; 
              })
              if (!req.query.sortDirection || req.query.sortDirection==='asc')
                return totalA - totalB; 
              else 
                return totalB - totalA;
            })  
            res.render('index', {projects: projects})
          }); 
        }       
                    
  } else if (req.query.funded) {
      Project.find(function(err, projects){
        var project2 = projects.filter(function(project) {
          var total = 0;
          project.contributions.forEach(function(donation) {
            total+=donation.amount; 
          })
          if(req.query.funded==='yes')
            return total >= project.goal;
          else
            return total < project.goal;
        })
        res.render('index', {projects: projects2})
      }) 

  } else if(!req.query.funded) {   
        Project.find(function(err, projects){
          res.render('index', {projects: projects})
        })       
  }  
});     

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('title', 'Must have title').notEmpty(); 
  req.checkBody('goal',  'Must have goal').notEmpty();
  req.checkBody('goal', 'Goal must be a number').isInt(); 
  req.checkBody('start', 'Must have start date').notEmpty();
  req.checkBody('end', 'Must have end date').notEmpty();
  req.checkBody('category', 'Must have a category').notEmpty();
  var errors = req.validationErrors(); 

  if(errors.length > 0) {
    res.render('new', {
      project: req.body, 
      errors: errors
      })
  } else {
    var project = new Project({
      title: req.body.title, 
      category: req.body.category, 
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end

    })
      project.save(function(err){
        if (err) {
          console.log(err); 
        } else { 
          res.redirect('/')
      }
    }) 
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var total_contributions = 0;  
  var percentraised = 0; 
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log(err)
    } else {
      console.log(project.category)
    project.contributions.forEach(function(donation) {
      total_contributions+=donation.amount; 
      percentraised = (total_contributions/project.goal)*100; 
    })
      res.render('project', {
        project: project, 
        total_contributions: total_contributions, 
        percentraised: percentraised 
      })
    }
  }); 
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var contribution = {
    name: req.body.donorname,
    amount: req.body.amount
  }; 
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log('error')
    } else {
      project.contributions.push(contribution)
      project.save(function(err) {
        if (err) {
            console.log(err); 
        } else { 
            res.redirect('/project/' + req.params.projectid)
            console.log(project.contributions)
        }
      })
    }
  });      
});  

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log('error')
    } else {
      res.render('editProject', {
        project: project, 
        start: project.start.toISOString().substring(0,10),
        end: project.end.toISOString().substring(0,10)
      })
    } 
  })
}); 
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {

  req.checkBody('title', 'Must have title').notEmpty(); 
  req.checkBody('goal',  'Must have goal').notEmpty();
  req.checkBody('goal', 'Goal must be a number').isInt(); 
  req.checkBody('start', 'Must have start date').notEmpty();
  req.checkBody('end', 'Must have end date').notEmpty();
  req.checkBody('category', 'Must have a category').notEmpty();
  var errors = req.validationErrors(); 

  if(errors.length > 0) {
      res.render('editProject', {
        project: req.body, 
        errors: errors
        })
    } else {
      Project.findByIdAndUpdate(req.params.projectid, {
        title: req.body.title,
        // YOUR CODE HERE
        category: req.body.category, 
        goal: req.body.goal,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end
      }, 
        function(err) {
      // YOUR CODE HERE
        if (err) {
          console.log('err')
        } else {
          res.redirect('/project/' + req.params.projectid)
        }  
      }
    )
  }
});    

module.exports = router;








