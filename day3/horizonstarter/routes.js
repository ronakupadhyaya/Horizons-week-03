"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var dateFormat = require('dateformat');


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
  Project.find(function(err, array) {
    if(err){}
  else{console.log(array[0])
    res.render('index', {intprojects: array});}

});
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
  var title = req.body.title,
      goal = req.body.goal,
      description = req.body.description,
      startDate = req.body.start,
      endDate = req.body.end,
      category = req.body.category

  req.checkBody("title", "You must give the project a title").notEmpty();
  req.checkBody("goal", "You must set a goal amount").notEmpty();
  req.checkBody("start", "You have to decide when to start fundraising").notEmpty();
  req.checkBody("end", "Dude, you can't collect money forever (end date)").notEmpty();
  var errors = req.validationErrors();
  if(errors.length > 0){
    //this is where I'd render the new.hbs with error messages
    res.render('new', {errors: errors,
                        title: title,
                        goal: goal,
                        description: description,
                        start: startDate,
                        end: endDate,
                        category: category})
  } else{
    var newP = new Project({
                            title: title,
                            goal: goal,
                            description: description,
                            start: startDate,
                            end: endDate,
                            category: category
  })
    newP.save(function(err){
      if (err){console.log(err)}
      else{console.log("THIS IS SAVING")}
    })
    res.redirect('/')
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projectid = req.params.projectid;
  var piw = Project.findById(projectid, function(err, proj){
    if(err){console.log("THIS DOESN'T EXIST")}
    else {
      res.render('project', { title: proj.title,
                          goal: proj.goal,
                          description: proj.description,
                          start: proj.start,
                          end: proj.end,
                          category: proj.category,
                        projectid: projectid})
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint

router.post('/project/:projectid', function(req, res) {
    var totalCont = 0;
  var projectid = req.params.projectid;
Project.findById(projectid, function(err, proj){
    if (err){console.log("THIS ISN'T WORKING")}
    else{
      if (proj.contributions){
        proj.contributions.push({name: req.body.name, amount:req.body.amount})
        proj.save(function(err){
        if(err){"TRYING TO FIND WGO"+ err}
        else{console.log("THIS IS SAVVING")}
      })
    }
    else{proj.contributions = [];
      proj.contributions.push({name: req.body.name, amount: req.body.amount})
      proj.save(function(err){
      if(err){"TRYING TO FIND WGO"+ err}
      else{console.log("THIS IS SAVVING")}
    })
    }
  }
 var pplArr = [];

  for(var i= 0; i <proj.contributions.length; i++){
    console.log("WHAT IS THE AMOUNT????????" + proj.contributions[i].amount )
     totalCont += proj.contributions[i].amount

  }
  console.log("MORE MONEY SHIT "+ totalCont)
  res.render('project', {title: proj.title,
                      goal: proj.goal,
                      description: proj.description,
                      start: proj.start,
                      end: proj.end,
                      totalCont: totalCont,
                      contributors: proj.contributions,
                      percent: Math.round((totalCont/proj.goal)*100) } )
})
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  // YOUR CODE HERE
  var projectid = req.params.projectid;
Project.findById(projectid, function(err, proj){
  if (err){console.log("THERE IS A BIG PROBLEM")}
  else{
    res.render('editProject', { title: proj.title,
                        goal: proj.goal,
                        description: proj.description,
                        start: dateFormat(proj.start, "yyyy-mm-dd"),
                        end: dateFormat(proj.end, "yyyy-mm-dd"),
                        category: proj.category,
                      projectid: projectid})

  }
})

});
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res){
  var projectid = req.params.projectid;

  Project.findByIdAndUpdate(projectid, {
        title: req.body.title,
        goal: req.body.goal,
        description: req.body.description,
        startDate: req.body.start,
        endDate: req.body.end,
        category: req.body.category

  }, function(err) {
    if(err) {console.log("THIS ISN'T WORKING OMGGGGGGGGGG")
  } else{
    console.log("Ch-ch-ch-ch-changes (TURN AND FACE THE STRAIN)")
  }

})
});


module.exports = router;
