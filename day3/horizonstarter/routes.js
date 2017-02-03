"use strict";
// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var _ = require('underscore');


var categoryEnum = ["Famous Muppet Frogs", "Current Black Presidents", "The Pen Is Mightier", "Famous Mothers", "Drummers Named Ringo", "1-Letter Words", "Months That Start With \"Feb\"", "How Many Fingers Am I Holding Up", "Potent Potables"];

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
  // YOUR CODE HERE
  if (req.query.sort) {
    var sortObject = {};
    if (req.query.sortDirection) {
      sortObject[req.query.sort] = req.query.sortDirection;
    }
    Project.find().sort(sortObject).exec(function(err, array) {
      console.log(array);
      res.render('index', {
        items: array
      });
    });
  } else {
    Project.find({}, function(error, projects) {
      if (error) {
        console.log('Error', error);
      } else {
        // console.log('Projects', projects);
        res.render('index', {
          items: projects
        });
      }
    });
  }

});

router.get('/totalContributions', function(req, res) {
  Project.find({}, function(err, projects) {
    if (err) {
      console.log("Error", err);
    } else {


      var sorted = _.sortBy(projects, function(project) {
        // TODO: fix the algo
        // projects.map(function(project) {
        //   return project.contributions.map(function(contribution) {
        //     return contribution.amount;
        //   });
        // }).map(function(contributions) {
        //   return contributions.reduce(function(a, b) {
        //     return -(-a + b);
        //   }, 0);
        // });

      });
      console.log(sorted);

      res.render('index', {
        items: sorted
      });
    }
  });
});



// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render("new");
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  // if (errors) {
  //   console.log(errors);
  //   res.render('register', {
  //     errors: errors
  //   });
  // } else {
  //   // YOUR CODE HERE
  //   // Include the data of the profile to be rendered with this template
  //   req.body.date = new Date();
  //   res.render('profile', req.body);
  // }


  function validate(req) {
    var schema = {
      'title': {
        notEmpty: true,
        errorMessage: 'fill in title'
      },
      'goal': {
        isInt: true,
        errorMessage: 'fill in goal'
      },
      'start': {
        notEmpty: true,
        errorMessage: 'fill in start date'
      },
      'end': {
        notEmpty: true,
        errorMessage: 'fill in end date'
      },
      'category': {
        notEmpty: true,
        errorMessage: 'fill in category'
      }
    };
    req.checkBody(schema);

  }

  validate(req);

  var errors = req.validationErrors();
  if (errors) {
    // do something with the errors
    res.render('new', {
      errors: errors
    });
  } else {


    //push project
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    });

    project.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        // res.send('Success: created a Project object in MongoDb');
        console.log("created project " + req.body.title);
        res.redirect("/");
      }
    });
  }



});


// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE

  // console.log(req.query.projectid);
  // console.log("pid" + req.params.projectid);
  // console.log(Project.findById(req.params.projectid));


  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log("Error", err);
    } else {
      // console.log(found.contributions);
      res.render('project', {
        id: found._id,
        title: found.title,
        goal: found.goal,
        description: found.description,
        start: found.start,
        end: found.end,
        contributions: found.contributions
      });
    }
  });


});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findOne({
    _id: req.params.projectid
  }, function(err, doc) {
    doc.contributions.push({
      name: req.body.name,
      amount: req.body.amount
    });

    doc.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.redirect("/project/" + req.params.projectid);
      }
    });

  });
});


router.post('/project/:projectId/contribution', function(req, res) {
  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log("Error", err);
    } else {
      // console.log(found.contributions);
      res.render('project', {
        id: found._id,
        title: found.title,
        goal: found.goal,
        description: found.description,
        start: found.start,
        end: found.end,
        contributions: found.contributions
      });
    }
  });
})

router.get('/project/:projectid/edit', function(req, res) {
  //get project

  function toDateStr(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate() + 1);
  }

  function pad(num) {
    var norm = Math.abs(Math.floor(num));
    return (norm < 10 ? '0' : '') + norm;
  }

  console.log(categoryEnum);


  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(found.start);
      console.log(toDateStr(found.start));
      res.render('editProject', {
        id: found._id,
        title: found.title,
        goal: found.goal,
        description: found.description,
        start: toDateStr(found.start),
        end: toDateStr(found.end),
        contributions: found.contributions,
        category: found.category,
        options: categoryEnum
      });
    }
  });

  console.log(req.params.projectid);


});


// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint


router.post('/project/:projectid/edit', function(req, res) {
  Project.findById({
    _id: req.params.projectid
  }, function(err, doc) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("BODY TITLE", req.body.title);
      console.log("DOC", doc);
      doc.title = req.body.title;
      doc.goal = req.body.goal;
      doc.description = req.body.description;
      doc.start = req.body.start;
      doc.end = req.body.end;
      doc.category = req.body.category;
      doc.save(function(err) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Edited Project");
          res.redirect("/project/" + req.params.projectid);
        }
      })
    }
  })

});



module.exports = router;