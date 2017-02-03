"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var validate = require('express-validator');

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
  var sortDirection = req.query.sortDirection;
  if (req.query.sort === 'goal') {
    Project.find(function(err, arr) {
      res.render('index', {arr:arr});
    }).sort({goal: sortDirection});
  } else if (req.query.sort === 'start') {
    Project.find(function(err, arr) {
      res.render('index', {arr:arr});
    }).sort({start: sortDirection});
  } else if (req.query.sort === 'end'){
    Project.find(function(err, arr) {
      res.render('index', {arr:arr});
    }).sort({end: sortDirection});
  } else {
    Project.find(function(err, arr) {
        res.render('index', {arr:arr});
    });  
  }
});


// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {});
  //finish this
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  validate(req);
  var proj = new Project({title: req.body.title, goal: req.body.goal, description: req.body.description, start: req.body.start, end: req.body.end, category: req.body.category});
  console.log(proj, "SOME PROJECT");
  proj.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

function validate(req) {
  req.checkBody('title', 'title gone').notEmpty();
  req.checkBody('goal', 'goal gone').notEmpty();
  req.checkBody('start', 'start gone').notEmpty();
  req.checkBody('end', 'end gone').notEmpty();
}

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, doc) {
    if(err) {
      console.log(err);
    } else {
      var totalContr = 0;
      var contributors = [];
      doc.contribution.forEach(function(item) {
        totalContr += item.amount;
        contributors.push(item);
      })
      var percent = (totalContr/doc.goal) * 100;
      console.log(doc.category);
      res.render('project',
      {title: doc.title,
       goal: doc.goal,
       description: doc.description,
       start: doc.start,
       end: doc.end,
       contribution: totalContr,
       percent: percent,
       contributors: contributors,
       category: doc.category,
       id: req.params.projectid});
    }
  })
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var obj = {name: req.body.name, amount: req.body.amount};
  Project.findById(req.params.projectid, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc, "doc man");
      doc.contribution.push(obj);
      doc.save(function(err) {
        if(err) {
          console.log(err);
        } else {
          var totalContr = 0;
          var contributors = [];
          doc.contribution.forEach(function(item) {
            totalContr += item.amount;
            contributors.push(item);
          })
          var percent = (totalContr/doc.goal) * 100;
          res.render('project',
          {title: doc.title,
           goal: doc.goal,
           description: doc.description,
           start: doc.start,
           end: doc.end,
           contribution: totalContr,
           percent: percent,
           contributors: contributors,
           category: doc.category,
           id: req.params.projectid});
        }
      })
    }
  })

});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

function pad(num) {
  var norm = Math.abs(Math.floor(num));
  return (norm < 10 ? '0' : '') + norm;
}

// This function
function toDateStr(date) {
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate() + 1);
}

router.get('/project/:projectid/edit', function(req, res){
  Project.findById(req.params.projectid, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      var arr = ['Famous Muppet Frogs', 'Current Black Presidents', 'The Pen Is Mightier', 'Famous Mothers', 'Drummers Named Ringo', '1-Letter Words', 'Months That Start With "Feb"', 'How Many Fingers Am I Holding Up', 'Potent Potables'];
      var ret = "";
      arr.forEach(function(item) {
        ret += '<option ';
        if (item === doc.category) {
          ret += 'selected ';
        }
        ret += ('value=' + "'" + item + "'" + '>' + item + '</option>');
      })
      console.log(doc.start);
      res.render('editProject', {
       title: doc.title,
       goal: doc.goal,
       description: doc.description,
       start: toDateStr(doc.start),
       end: toDateStr(doc.end),
       category: ret,
       projectid: req.params.projectid
      })
    }
  })
})

router.post('/projects/:projectid/edit', function(req, res) {
  console.log(req.params.projectid);
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/')
    }
  });
})

// router.get('/project/?sort=&sortDirection=', function(req, res) {
//   console.log(req.query);
// })



module.exports = router;
