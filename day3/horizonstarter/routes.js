"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var Contribution = require('./models').Contribution;
var strftime = require('strftime');

var categories = ['Famous Muppet Frogs',
       'Current Black Presidents',
       'The Pen Is Mightier',
       'Famous Mothers',
       'Drummers Named Ringo',
       '1-Letter Words',
       'Months That Start With "Feb"',
       'How Many Fingers Am I Holding Up',
       'Potent Potables'
     ];

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

// Exercise 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  Project.find({}, function(err, projects) {
    if (err) {
      console.log("There has been a problem with your projects");
    } else if (projects) {
      res.render('index', {items: projects});
    } else {
      console.log("No projects lucky you");
    }
  })
});

function validate(req) {
  req.checkBody({
    'title': {
      notEmpty: true,
      errorMessage: "Please enter a title"
    },
    'goal': {
      notEmpty: true,
      errorMessage: "Please enter a goal"
    },
    'start': {
      notEmpty: true,
      errorMessage: "Please enter a start date"
    },
    'end': {
      notEmpty: true,
      errorMessage: "Please enter an end date"
    }
  })
}

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {categories: categories});
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  validate(req);

  var errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    res.render('new', {errors: errors});
  } else {
    var mrProject = new Project(req.body);
    console.log(req.body);
    mrProject.save(req.body, function(err, project) {
      if (err) {
        console.log("You suck");
      } else {
        res.redirect('/');
        console.log('Project saved!');
      }
    });
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var something = Project.findById(req.params.projectid)
  .populate('contributions')
  .exec(function(err, project) {
    if (err) {
      console.log("Error finding project");
    } else {
      var total = project.contributions.reduce(function(a,b) {
        return a + b.amount;
      }, 0);
      project.total = total;
      project.progress = JSON.stringify(total/project.goal * 100) + '%';
      res.render('project', project);
    }
  });
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  console.log("asd");
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log("Error finding project");
    } else {
      var contribution = new Contribution(req.body);
      contribution.save(function(err, contribution) {
        if (err) {
          console.log("Error with contribution");
        } else {
          project.contributions.push(contribution);
          project.save(function(err, project) {
            if (err) {
              console.log("error WHYYYY");
              console.log(project);

            }
            else {
              res.redirect('/project/' + project._id);
            }
          })
        }
      })
    }
  });
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    if (err) console.log('shit');
    else {
      project.categories = categories;
      res.render('editProject', project);
    }
  });
});
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  validate(req);
  Project.findByIdAndUpdate(req.params.projectid,
    { $set : {title:req.body.title,
              description: req.body.description,
              goal: req.body.goal,
              category: req.body.category,
              start: req.body.start,
              end: req.body.end
              }}, function(err) {
      if (err) {
        console.log("Error editing");
      } else {
        res.redirect('/project/' + req.params.projectid);
      }
    })

});

router.get('/sort', function(req, res) {
  //if(req.query.sort) {

    var sortObj = {};
    if (req.query.order === 'descending') {
      console.log("got descending");
      sortObj[req.query.by] = -1;
    } else {
      sortObj[req.query.by] = 1;
    }
    Project.find().sort(sortObj).exec(function(err, array) {
      if (err) {
        console.log("Error sorting");
      } else {
        console.log("the array is printing below lol");
        console.log(array);
        res.render('index', {items: array});

      }
    })
  //}
})

router.get('/filter', function(req, res) {
  res.redirect('/');
})

router.post('/api/project/:projectId/contribution', function(req, res) {
  Project.findById(req.params.projectId, function(err, project) {
    if (err) {
      console.log("Error finding your project");
      throw err;
    } else {
      var contributionObj = new Contribution(req.body);
      //console.log(contributionObj);
      contributionObj.save(function(err, contribution) {
        if (err) {
          console.log("Error with contribution");
        } else if (contribution.amount < 0){
          res.status(400).send({
            message: "Amount cannot be below 0"
          });
        } else {
          console.log(project);
          project.contributions.push(contribution);
          project.save(function(err, project) {
            if (err) {
              console.log("error WHYYYY");
              console.log(project);

            }
            else {
              res.json(contribution);
            }
          })
        }
      })
    }
  })
});

router.get('/api/project', function(req, res) {
  Project.find()
    .populate('contributions')
    .exec(function(err, projects) {
    if (err) {
      res.status(400).json(err);
    } else {

      //need to check req.query.amountFunded
          //check req.query.sortDirection (only if amountFunded is present)

      if (req.query.funded) {

        projects = projects.filter(function(project) {
          var contributionSum = project.contributions.reduce(function(a,b) {
            if (b.amount === undefined) {
              return a;
            }
            return a + b.amount;
          }, 0);
          return req.query.funded === 'true' ? (contributionSum >= project.goal) : (contributionSum < project.goal);
        });
      }
      res.json(projects);
    }
  });
});


module.exports = router;
