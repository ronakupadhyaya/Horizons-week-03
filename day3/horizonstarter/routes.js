"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

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

  if(req.query.sortKey === 'contributions'){

    Project.find({}, function(err, array) {
      
      var newArray = array.sort(function(a, b){

        if(a.contributions.length > b.contributions.length){
          return 1;
        } else if(a.contributions.length < b.contributions.length){
          return -1;
        }
        return 0;
      });


      res.render('index', {items: newArray});

      console.log(array);

      if(err){
        console.log(err);

      }else{
        console.log("Projects rendered on page.");
      }

    });

    return;

  }


  if(req.query.sortKey){
    var sortObject = {};
    sortObject[req.query.sortKey] = req.query.sortVal;
    Project.find().sort(sortObject).exec(function(err, array) {

      res.render('index', {items: array});

      if(err){
        console.log(err);
      }else{
        console.log("Sorted projects rendered on page.");
      }

    });
  } else{
    Project.find({}, function(err, array) {
      res.render('index', {items: array});

      if(err){
        console.log(err);

      }else{
        console.log("Projects rendered on page.");
      }

    });
  }
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new');
});

function validate(req) {

  req.checkBody('title', 'Must enter a title').notEmpty();
  req.checkBody('goal', 'Must enter a goal').notEmpty();
  req.checkBody('start', 'Must enter a start date').notEmpty();
  req.checkBody('start', 'Must enter a start date that is a date').isDate();
  req.checkBody('end', 'Must enter an end').notEmpty();
  req.checkBody('end', 'Must enter an end date that is a date').isDate();

}

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  console.log("Hello WOrld");
  console.log(req.body);


  validate(req);

  var errors = req.validationErrors();
  if (errors) {
    res.render('new', {errors: errors});
  } else {

    var newItem = new Project({title: req.body.title, goal: req.body.goal, description: req.body.description, start: req.body.start, end: req.body.end, contrSoFar: 0, category: req.body.category});

    newItem.save(function(err){

      if(err){
        console.log(err);
      } else{
        console.log('Project Item Saved');
        res.redirect('/');
      }
    }); 
  }

});

function pad(num) {
  var norm = Math.abs(Math.floor(num));
  return (norm < 10 ? '0' : '') + norm;
}

router.get('/project/:projectid/edit', function(req, res){

  // gets the given Project from MongoDb 
  // using .findById() and renders editProject.hbs with the Project object
  var id = req.params.projectid;

  Project.findById(id, function (err, proj) {

    var startDate = new Date(proj.start);

    var startYear = startDate.getFullYear();
    var startYearStr = '' + startYear;

    if(startYearStr.length < 4){
      while(startYearStr.length < 4){
        startYearStr = '0' + startYearStr;
      }
    }
    var startDateStr = startYearStr + '-' + pad(startDate.getMonth() + 1) + '-' + pad(startDate.getDate() + 1); // b/c zero-indexed


    var endDate = new Date(proj.end);
    var endYearStr = '' + startYear;

    if(endYearStr.length < 4){
      while(endYearStr.length < 4){
        endYearStr = '0' + endYearStr;
      }
    }


    var endDateStr = endYearStr + '-' + pad(endDate.getMonth() + 1) + '-' + pad(endDate.getDate() + 1); // b/c zero-indexed


    proj['startDateStr'] = startDateStr;
    proj['endDateStr'] = endDateStr;

    
    if(err){
      console.log(err);
    } else{
      console.log(proj);
      res.render('editProject', {project: proj});
    }

  });

});





// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  
  var id = req.params.projectid;
  // console.log(req.params);

  Project.findById(id, function (err, proj) {

    console.log(proj);
    if(err){
      console.log(err);
    } else{

      res.render('project', {project: proj});
    }



  });


});


router.post('/project/:projectid/edit', function(req, res) {

  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category,
    contributions: req.body.contributions,
    contrSoFar: req.body.contrSoFar,
    contrPercent: req.body.contrPercent

    // YOUR CODE HERE
    }, function(err) {
    // YOUR CODE HERE

    if(err){
      console.log('THIS IS THE END');
      console.log(err);
    } else{
      console.log('Project Updated Successfully.');
    }

    res.redirect('/');

  });





});




// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {

  Project.findById(req.params.projectid, function (err, proj) {

    if(err){
      console.log(err);
    } else{

      console.log("*************FUCK MY LIFE*********************");

      var obj = {name: req.body.name, amount: req.body.amount};

      if('contributions' in proj){
        proj['contributions'].push(obj);
      } else{
        proj['contributions'] = [];
        proj['contributions'].push(obj);
      }

      if('contributions' in proj){
        if(proj['contributions'].length > 0){
          proj['contrSoFar'] = proj['contributions'].map(function(contribution){
            return contribution.amount;
          }).reduce(function(a,b){
            return a + b;
          }, 0);
        }
      }

      proj['contrPercent'] = (proj['contrSoFar']/ proj['goal']) * 100;
      
      
      // console.log(proj);

      proj.save(function(err){

        if(err){
          console.log(err);
        }else{
          console.log("Project saved.");
          res.redirect('/project/'+req.params.projectid);
        }

      });
      
    }

  });

  
});



router.post('/api/project/:projectId/contribution', function(req, res){

  Project.findById(req.params.projectId, function (err, proj) {
    // console.log("BLAH BLAH BLAH");
    // console.log(proj);

    if(err){
      res.status(400).json("Couldn't find project with specified Id.");
    }

    var contributionObj = {

      name: req.body.name,
      amount: req.body.amount
    };

    if('contributions' in proj){
      proj['contributions'].push(contributionObj);
    } else{
      proj['contributions'] = [];
      proj['contributions'].push(contributionObj);
    }

    proj.save(function(err){

        if(err){
          res.status(400).json("Trouble saving project with new contributor");
        }else{
          console.log("Project saved.");
          res.status(201).json("Successully modified contributors.");
          // res.redirect('/project/'+req.params.projectid);
        }

    });





  });
});



module.exports = router;
