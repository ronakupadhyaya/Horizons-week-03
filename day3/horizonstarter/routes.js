"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// helper function: formatDate
// so that the dates will be prefilled
function formatDate(date) {
  var date = new Date(date);
  return date.toISOString().substring(0, 10);
}

function findTotalContributions(proj) {
  // console.log(proj.title, proj.contributions.reduce(function(total, contribution) {
  //   return total + contribution.amount;
  // }, 0))
  // return proj.contributions.reduce(function(total, contribution) {
  //   return total + contribution.amount;
  // }, 0);
  var total = 0;
  proj.contributions.forEach(function(contribution) {
    if (contribution.amount) {
      total+= contribution.amount;
    }
  })
  return total;
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
  if (req.query.sort) {
    if (req.query.sort === "totalContributions") { // sort by contributions
      Project.find(function(err, projects) {
        var project = projects.sort(function(proj1, proj2) {
          // console.log('proj1: ' + findTotalContributions(proj1));
          // console.log('proj2: ' + findTotalContributions(proj2))
          return findTotalContributions(proj1) - findTotalContributions(proj2);
        })
        res.render('index', {
          projects: projects
        })
      })
    }
    else if (req.query.sort === 'funded') {
      Project.find(function(err, projects) {
        var projects = projects.filter(function(proj) {
          return findTotalContributions(proj) === proj.goal;
        })
        res.render('index', {
          projects: projects
        })
      })
    }
    else {
      var sortObj = {};
      sortObj[req.query.sort] = 1; // default is ascending order
      if (req.query.sortDirection === 'descending') {
        sortObj[req.query.sort] = -1;
      }
      Project.find().sort(sortObj).exec(function(err, array) {
        res.render('index', {
          projects: array
        })
      });
    }
  }
  else {
    Project.find(function(err, projects) {
      if (err) {
        console.log(err);
      }
      else {
        res.render('index', {projects: projects});
      }
    })

  }

});

router.post('/', function(req, res) {
  res.render('new');
})
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
  req.checkBody('title', 'Title cannot be empty').notEmpty();
  req.checkBody('goal', 'Goal cannot be empty').notEmpty()
  req.checkBody('goal', 'Goal has to be a number').isNumeric();
  req.checkBody('start', 'Start date cannot be empty').notEmpty();
  req.checkBody('start', 'Start date has to be a date').isDate();
  req.checkBody('end', 'End date cannot be empty').notEmpty();
  req.checkBody('end', 'End date has to be a date').isDate();
  req.checkBody('category', 'Category is required').notEmpty();
  var err = req.validationErrors();
  // var isTitle = (req.body.ti.length % 2 === 0 ? true : false);
  if (err) {
    res.render('new', {
      err: err,
      // isTitle: isTitle,
      // isGoal: isGoal,
      // isStart: isStart,
      // isEnd: isEnd
    })
  }
  else {
    var title = req.body.title;
    var goal = req.body.goal;
    var description = req.body.description;
    var start = (new Date(req.body.start)).toDateString();
    var end = (new Date(req.body.end)).toDateString();
    var category = req.body.category;
    var newProj = new Project({
      title: title,
      goal: goal,
      description: description,
      start: start,
      end: end,
      category: {name: category, selected: true}
    });
    newProj.save(function(err) {
      if (err) {
        console.log('Error occurred');
      }
      else {
        console.log('Saved new task');
      }
    });
    res.redirect('/');
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, proj) {
    if (err) {
      console.log(err);
    }
    else {
      var total;
      if (proj.contributions === []) {
        total = 0;
        percentage = 0;
      }
      else {
        total = findTotalContributions(proj);
        var percentage = parseInt((total / proj.goal) * 100);
      }
      res.render('project', {
        project: proj,
        percent: percentage,
        start: (proj.start).toDateString(),
        end: (proj.end).toDateString(),
        total: total
      })
    }
  });
})

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  //console.log(req.params)
  Project.findById(req.params.projectid, function(err, proj) {
    if (err) {
      //console.log(req.params.projectid)
      console.log(err);
    }
    else {
      var donation = {name: req.body.name, amount: req.body.amount};
      proj.contributions.push(donation);
      proj.save(function(error) {
        if (error) {
          console.log(error);
        }
        else {

          var total = findTotalContributions(proj);
          var percentage = parseInt((total / proj.goal) * 100);
          console.log(total);
          res.render('project', {
            project: proj,
            percent: percentage,
            total: total,
            start: (proj.start).toDateString(),
            end: (proj.end).toDateString(),
          })
        }
      });
    }
  })
});
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, proj) {
    if (err) {
      console.log(err);
    }
    else {
      var isCategory1 = ('Famous Muppet Frogs' === proj.category.name? true: false);
      var isCategory2 = ('Current Black Presidents' === proj.category.name? true: false);
      var isCategory3 = ('The Pen Is Mightier' === proj.category.name? true: false);
      var isCategory4 = ('Famous Mothers' === proj.category.name? true: false);
      var isCategory5 = ('Drummers Named Ringo' === proj.category.name? true: false);
      var isCategory6 = ('1-Letter Words' === proj.category.name? true: false);
      var isCategory7 = ('Months That Start With "Feb"' === proj.category.name? true: false);
      var isCategory8 = ('How Many Fingers Am I Holding Up' === proj.category.name? true: false);
      var isCategory9 = ('Potent Potables' === proj.category.name? true: false);
      res.render('editProject', {
        project: proj,
        start: formatDate(proj.start),
        end: formatDate(proj.end),
        isCategory1: isCategory1,
        isCategory2: isCategory2,
        isCategory3: isCategory3,
        isCategory4: isCategory4,
        isCategory5: isCategory5,
        isCategory6: isCategory6,
        isCategory7: isCategory7,
        isCategory8: isCategory8,
        isCategory9: isCategory9,
      })
    }
  })
});

router.post('/project/:projectid/edit', function(req, res) {
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: (new Date(req.body.start)).toDateString(),
    end: (new Date(req.body.end)).toDateString(),
    category: req.body.category
  }, {new: true}, function(err, proj) {

    res.redirect('/project/' + proj._id);
  });
});

router.post('/api/project/:projectId/contribution', function(req, res) {
  Project.findById(req.params.projectId, function(err, proj) {
    if (err) {
      throw new Error("Project not found!");
    }
    else {
      if (parseInt(req.body.amount) < 0) {
        res.status(400).json("Invalid contribution amount");
      }
      var donation = {name: req.body.name, amount: req.body.amount};

      proj.contributions.push(donation);
      proj.save(function(error) {
        if (error) {
          console.log(error);
        }
        else {
          var total = findTotalContributions(proj);
          // proj.contributions.forEach(function(contribution) {
          //   total += contribution.amount;
          // })
          // console.log(total);
          //console.log(proj.contributions);
          var percentage = parseInt((total / proj.goal) * 100);
          res.json({"name": req.body.name,"amount": parseInt(req.body.amount)});
        }
      });
    }
  })
})

router.get('/api/projects', function(req, res) {
  Project.find(function(err, projects) {
    if (req.query.funded === 'true') {
      projects = projects.filter(function(proj) {
        return findTotalContributions(proj) === proj.goal;
      })
    }
    else {
      projects = projects.filter(function(proj) {
        return findTotalContributions(proj) !== proj.goal;
      })
    }
    res.json({
      projects: projects
    })
  })
})
// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
