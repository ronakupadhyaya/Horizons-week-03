"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var moment = require('moment');

var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
// router.get('/create-test-project', function(req, res) {
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
router.get('/', function(req, res) {
  //).sort({title: 1}).exec
  Project.find(function(err, array) {
    if(err) {
      console.log(err)
      return;
    }
    var newArray = [];
    array.forEach(function(element) {
      var start = moment(element.start).format('MMM Do YYYY');
      var end = moment(element.end).format('MMM Do YYYY');
      var category = element.category
      if (!element.category) {
        category = "Other"
      }
      var newElement = {
        _id: element._id,
        title: element.title,
        description: element.description,
        start: start,
        end: end,
        contributions: element.contributions,
        goal: element.goal,
        category: category
      };
      newArray.push(newElement);
    })
    res.render('index', {
      allProjects: newArray
    });
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {})
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  console.log(req.body)
    console.log(req.body.category)

var project =new Project({
              title: req.body.title,
              goal: req.body.goal,
              description: req.body.description,
              start: req.body.start,
              end: req.body.end,
              category: req.body.category
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
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, projectObj) {

var totalAmount = 0
var percent = 1
var contributors = projectObj.contributions

//FIND TOTAL CONTRIBUTIONS
projectObj.contributions.forEach(function(element) {
  totalAmount += ~~(+element.amount)
})

//FIND PERCENT
percent = totalAmount/projectObj.goal
percent *= 100
if (percent>100) {
  percent = 100
}
var start = moment(projectObj.start).format('MMM Do YYYY');
var end = moment(projectObj.end).format('MMM Do YYYY');
var category = projectObj.category || "Other"

    if(err) {
      console.log(err)
      return;
    }
    res.render('project', {
      item: projectObj,
      total: totalAmount,
      percent: percent,
      contributors: contributors,
      start: start,
      end: end,
      category: category
    });
  })
});

// Part 4: Contribute to a project
// Implement the POST /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, current) {
    if(err) {
      console.log(err)
      return;
    }
    var contObj = {
      name: req.body.name,
      amount: req.body.amount
    }
    current.contributions = current.contributions || []
    current.contributions.push(contObj)

    current.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.redirect(`/project/${current._id}`)
      }
    });

//CHANGE CURRENT --> ADD CONTR DATA
//SAVE

  })
})

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

//WHEN YOU CLICK EDIT, SERVER GIVES YOU A FORM
router.get('/project/:projectid/edit', function(req, res) {


  Project.findById(req.params.projectid, function(err, projectObj) {
    console.log(projectObj.start.getTime())

    var dateSt = projectObj.start.toISOString()
    var dateFormatSt = dateSt.slice(0,10)

    var dateEnd = projectObj.end.toISOString()
    var dateFormatEnd = dateEnd.slice(0,10)

    var category = projectObj.category

    var categoryOptions = ['Oil and Gas', 'Food and Beverage', 'Technology', 'Agriculture', 'Manufacturing', 'Toys and Games', 'Travel', 'Other'];
    categoryOptions = categoryOptions.map(function(i) {
      return {
        name: i,
        checked: i === category ? true : false
      };
    });


    res.render('editProject', {
      item: projectObj,
      start: dateFormatSt,
      end: dateFormatEnd,
      id: req.params.projectid,
      categoryOptions: categoryOptions
    });
  })
})

//WHEN THE USER HITS POST, IT REQUESTS SERVER TO CHANGES
router.post('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, projectObj) {
    projectObj.title = req.body.title
    projectObj.goal = req.body.goal
    projectObj.description = req.body.description
    projectObj.category = req.body.category
    projectObj.save()
    res.redirect("/")
  });

});

router.get('/sort', function(req, res) {

    var direction = 1
    if (req.query.sortDirection === "ascending") {
      direction = 1
    }
    if (req.query.sortDirection === "decending") {
      direction = -1
    }

    console.log(req.query)
    var sortObject = {};
    sortObject[req.query.sort] = direction;
    Project.find().sort(sortObject).exec(function(err, array) {

      console.log(sortObject)

      if(err) {
        console.log(err)
        return;
      }
      var newArray = [];
      array.forEach(function(element) {
        var start = moment(element.start).format('MMM Do YYYY');
        var end = moment(element.end).format('MMM Do YYYY');
        var category = element.category
        if (!element.category) {
          category = "Other"
        }
        var newElement = {
          _id: element._id,
          title: element.title,
          description: element.description,
          start: start,
          end: end,
          contributions: element.contributions,
          goal: element.goal,
          category: category
        };
        newArray.push(newElement);
      })
      res.render('index', {
        allProjects: newArray
      });

    });
  })

module.exports = router;
