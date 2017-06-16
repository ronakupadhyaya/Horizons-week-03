"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var expressValidator = require('express-validator');
router.use(expressValidator());
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

// part 7:  Sort projects
router.get('/', function(req, res) {
  // YOUR CODE HERE
  if (req.query.sort) {
    if (req.query.sort === 'contributions') {
      Project.find(function(err, array) {
        array.sort(function(a, b) {
          var contributionA = a.contributions;
          var contributionB = b.contributions
          var totalEachA = 0;
          var totalEachB = 0;
          contributionA.forEach(function(ele) {
            totalEachA += parseInt(ele.amount);
          })
          contributionB.forEach(function(item) {
            totalEachB += parseInt(item.amount);
          })
          if (totalEachA === undefined) {
            totalEachA = 0;
          }
          if (totalEachB === undefined) {
            totalEachB = 0;
          }
          return totalEachA - totalEachB;
        })
        res.render('index', {
          items: array
        });
      });

    } else {
      var sortObject = {};
      sortObject[req.query.sort] = 1;
      Project.find().sort(sortObject).exec(function(err, array) {
        res.render('index', {
          items: array
        });
        // YOUR CODE HERE
      });
    }
  } else {
    if (req.query.view === 'full') {
      Project.find(function(err, array) {
        var newList = array.filter(function(item) {
          var contribution = item.contributions;
          var totalAmount = 0;
          contribution.forEach(function(ele) {
            totalAmount += parseInt(ele.amount);

          })
          return totalAmount >= parseInt(item.goal);
        })
        res.render('index', {
          items: newList
        });
      });
    } else if (req.query.view === 'notfull') {
      Project.find(function(err, array) {
        var newList = array.filter(function(item) {
          var contribution = item.contributions;
          var totalAmount = 0;
          contribution.forEach(function(ele) {
            totalAmount += parseInt(ele.amount);

          })
          return totalAmount < parseInt(item.goal);
        })
        res.render('index', {
          items: newList
        });
      });
    } else {
      Project.find(function(err, array) {
        res.render('index', {
          items: array
        });
      });

    }
  }

});

// Part 1: View all projects
// Implement the GET / endpoint.
// router.get('/', function(req, res) {
//   // YOUR CODE HERE
//   Project.find(function(err, array) {
//
//     res.render('index', {
//       items: array
//     });
//
//   });
// });

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new');

});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('title', 'Title must not be empty').notEmpty();
  req.checkBody('goal', 'Goal is required and must be an integer').notEmpty().isInt();
  req.checkBody('start', 'Start date must not be empty').notEmpty();
  req.checkBody('end', 'End date must not be empty').notEmpty();
  var errors = req.validationErrors(); // YOUR CODE HERE - Get errors from express-validator here
  if (errors) {
    // console.log(req.body.category);
    res.render('new', {
      errors: errors,
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category // question why it doesn't change
    });
  } else {
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    });

    project.save(function(error) {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/');
      }
    });

  }

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(error, found) { // found is an object
    if (error) {
      console.log(error);
      // throw new Error('there is an error');
    } else {
      // console.log(found);
      var total = 0;
      found.contributions.forEach(function(item) {
        total += parseInt(item.amount);
      })
      // console.log(sumAmount);
      // console.log(found.category);
      res.render('project', {
        title: found.title,
        goal: found.goal,
        description: found.description,
        start: found.start,
        end: found.end,
        contributions: found.contributions,
        totalAmount: total,
        percentage: Math.floor((total / found.goal) * 100),
        category: found.category,
        id: id
      })
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(error, found) { // found is an object
    if (error) {
      console.log(error);
      // throw new Error('there is an error');
    } else {

      // console.log(found);
      // if ((req.body.name !== undefined) && (req.body.amount !== undefined)) {
      var newObject = {
        name: req.body.name,
        amount: req.body.amount
      }
      found.contributions.push(newObject);
      found.save(function(error) {
        if (error) {
          console.log(error);
          // throw new Error('there is an error');
        } else {
          res.redirect('/');
        }
      });
      // }
    }
  })
});

// Part 6: Edit project
router.get('/project/:projectid/edit', function(req, res) {
  // console.log(123123);
  // console.log(req.)
  var id = req.params.projectid;
  Project.findById(id, function(error, found) { // found is an object
    var categories = ['Famous Muppet Frogs', 'Current Black Presidents',
      'The Pen Is Mightier', 'Famous Mothers', 'Drummers Named Ringo',
      '1-Letter Words', 'Months That Start With "Feb"', 'How Many Fingers Am I Holding Up',
      'Potent Potables'
    ];
    categories = categories.map(function(i) {
      return {
        name: i,
        selected: found.category === i ? true : false
      }
    });
    if (error) {
      console.log(error);
      // throw new Error('there is an error');
    } else {
      res.render('editProject', {
        title: found.title,
        goal: found.goal,
        description: found.description,
        start: found.start.toISOString().slice(0, 10),
        end: found.end.toISOString().slice(0, 10),
        categories: categories,
        id: id
      })
      // console.log(found);
    }
  });
})

router.post('/project/:projectid/edit', function(req, res) {

  var id = req.params.projectid;
  Project.findByIdAndUpdate(id, { /// quesiont how to remove the previous one
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    // categories: categories
    category: req.body.category
    // YOUR CODE HERE
  }, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
    // YOUR CODE HERE
  });
})
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint





module.exports = router;
