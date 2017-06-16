"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var categories = {
  muppetFrogs: 'Famous Muppet Frogs',
  blackPres: 'Current Black Presidents',
  penMight: 'The Pen Is Mightier',
  famMother: 'Famous Mothers',
  drumRing: 'Drummers Named Ringo',
  oneLett: '1-Letter Words',
  monthFeb: 'Months That Start With "Feb"',
  fingersHold: 'How Many Fingers Am I Holding Up',
  potentPot: 'Potent Potables'
}

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
  var direction = req.query.sortDirection ==='descending' ? -1 : 1;
  // ascending is 1 and descending is -1
  if (req.query.sort) {
    var sortObject = {};
    sortObject[req.query.sort] = direction;
    Project.find({}).sort(sortObject).exec(function(err, array) {
      // YOUR CODE HERE
      if (err) {
        console.log(`Something went wrong: ${err}`);
      } else {
        //render here and pass in the array
        res.render('index', {
          projects: array,
        })
      }
    });
  } else {
      Project.find(function(err, array){
        if (err) {
          console.log(`Something went wrong: ${err}`);
        } else {
          var readArr = []
          array.forEach(function(item){
            var startDate = item.start.toISOString().split('T')[0].split('-').join('/');
            var endDate = item.end.toISOString().split('T')[0].split('-').join('/');
            console.log(startDate);
            readArr.push({
              title: item.title,
              category: item.category,
              goal: item.goal,
              description: item.description,
              start: startDate,
              end: endDate,
            })
          })
          res.render('index', {
            projects: readArr,
            categories: categories,
          })
        }
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

  // TODO validating the entries
  req.check('title', 'Title is required').notEmpty();
  req.check('category', 'Category required').notEmpty();
  req.check('goal', 'Goal is required').notEmpty();
  req.check('start', 'Start date required').notEmpty();
  req.check('end', 'End date required').notEmpty();

  var error = req.validationErrors() ;

  if (error) {
    res.render('new', {
      title: req.body.title,
      category: req.body.category,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      error: error
    })
  } else {
    var proj = new Project({
      title: req.body.title,
      category: req.body.category,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
    proj.save(function(err){
      if (err) {
        console.log(`Something went wrong: ${err}`);
      } else {
        res.redirect('/');
      }
    })
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, proj){
    if (err) {
      console.log(`Something went wrong: ${err}`);
      res.render('project', {
        id: 'not found',
        project: {
          title: ""
        }
      })
    } else {
      console.log(proj);
      var amountTotal = 0;
      var percentageGoal = 0;
      proj.contributions.forEach(function(contribution){
        amountTotal += contribution.amount;
      })
      if (amountTotal < proj.goal) {
        percentageGoal = amountTotal/proj.goal
      } else {
        percentageGoal = 100;
      }

      res.render('project', {
        id: id,
        project: proj,
        percent: percentageGoal
      })
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  //TODO sum up the total number of contributions HERE

  //TODO show the total number of contributions

  //TODO make the contribution bar

  var id = req.params.projectid;
  Project.findById(id, function(err, proj){
    if (err) {
      console.log(`Something went wrong: ${err}`);
      res.render('project', {
        id: 'not found',
        project: {
          title: ""
        }
      })
    } else {
      var amountTotal = 0;
      var percentageGoal = 0;
      var contribution = {
        name: req.body.name,
        amount: req.body.amount
      };
      proj.contributions.push(contribution)
      proj.save();
      proj.contributions.forEach(function(contribution){
        amountTotal += contribution.amount * 1;
      })
      if (amountTotal <= proj.goal) {
        percentageGoal = amountTotal/proj.goal * 100;
      } else {
        percentageGoal = 100;
      }
      console.log(`percent is ${percentageGoal}`);
      res.render('project', {
        id: id,
        project: proj,
        percent: percentageGoal,
        amountTotal: amountTotal
      })
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, proj){
    if (err) {
      console.log(`Something went wrong: ${err}`);
      res.render('project', {
        id: 'not found',
        project: {
          title: ""
        }
      })
    } else {
      var startDate = proj.start.toISOString().split('T')[0];
      var endDate = proj.start.toISOString().split('T')[0];
      res.render('editProject', {
        id: id,
        project: proj,
        start: startDate,
        end: endDate
      });
    }
  })
});

router.post('/project/:projectid/edit', function(req, res) {
  var id = req.params.projectid;
  Project.findById(id, function(err, proj){
    if (err) {
      console.log(`Something went wrong: ${err}`);
      res.render('project', {
        id: 'not found',
        project: {
          title: ""
        }
      })
    } else {
      var project = new Project({
        title: req.body.title,
        category: req.body.category,
        goal: req.body.goal,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end
      });
      project.save(function(err){
        if (err) {
          console.log(`Something went wrong: ${err}`);
        } else {
          res.redirect('/project/' + id);
        }
      })
    }
  })
});

module.exports = router;
