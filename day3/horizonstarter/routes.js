"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var _ = require('underscore');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var expressValidator = require('express-validator');
router.use(expressValidator());


var validationSchema = {
  'title': {
    notEmpty: true,
    errorMessage: 'Invalid Title'
  },
  'goal':{
    notEmpty: true,
    errorMessage: 'Invalid Input for Goal',
    isInt: true
  },
  'start':{
    notEmpty: true,
    errorMessage: 'Invalid start date'
  },
  'end':{
    notEmpty: true,
    errorMessage: 'Invalid end date'
  },
  'category':{
    notEmpty: true,
    errorMessage: 'please select category'
  }
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


  Project.find(function(error,projects){
    if(error){
      console.log("projects not found");
    }else{
      //var sortedprojs = projects;
      if(req.query.funding){
        if(req.query.funding==="Fully Funded"){
          // console.log("filter by full funding");
          projects = _.filter(projects, function(project){
            if(project.contributions){
              return project.goal <= _.reduce(_.pluck(project.contributions, 'amount'), function(a,b){return a+b});
            } else {
               return project.goal <= 0
             }
          })

          // console.log("fully funded filtering", sortedprojs);
        } else if(req.query.funding === "Incomplete Funding"){
            projects = _.filter(projects, function(project){
              if(project.contributions){
                return project.goal> _.reduce(_.pluck(project.contributions, 'amount'), function(a,b){return a+b});
              } else { return project.goal > 0}
            })
          // console.log("NOT fully funded filtering", sortedprojs);
        }
      }

      if(req.query.sort){
        if(req.query.sort ==='Contributions'){
          projects = _.sortBy(projects,function(project){
            if(project.contributions){
              return project.contributions.length;
            }
            return 0;
          })
          if(req.query.sortDirection ==='Descending'){
            projects = projects.reverse();
          }

      // res.render('index', {projects: projects})
        } else {
          var sortObject = {};
          if(req.query.sortDirection ==='Descending'){
            sortObject[req.query.sort.toLowerCase()] = -1;
          }else {
            sortObject[req.query.sort.toLowerCase()] = 1;
          }
              // Project.find().sort(sortObject).exec(function(err, array) {
              //   res.render('index', {projects: array, sortval: req.query.sort, sortdir: req.query.sortDirection})
              // });
              console.log(sortObject)
          Project.find().sort(sortObject).exec(function(err, array) {
            console.log(array.map((x) => x.goal))
            res.render('index', {projects: array, sortval: req.query.sort, sortdir: req.query.sortDirection, fundfilter: req.query.funding})
          });
        }
      }else{ //no sorting
        res.render('index', {projects: projects, fundfilter: req.query.funding})
      }
    }
  });
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  var categories = Project.schema.path('category').enumValues;
  res.render('new',{
    categories: categories
  });
});

// Part 2:projectject
// Implement the POST /new endpoint


router.post('/new', function(req, res) {
  // YOUR CODE HERE
  var categories = Project.schema.path('category').enumValues;

  req.checkBody(validationSchema);
  // console.log('select catoeg',req.body.category);
  var errors = req.validationErrors();
  console.log(typeof req.body.start, req.body.start);
  if(errors){
    res.render('new',{
      errors: errors,
      categories: categories
    })

  }else{
    var newproject = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    });
    newproject.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        // res.send('Success: created a Project object in MongoDb');
        res.redirect('/');
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid,function(error,project){
    if(error){
      console.log("error finding project by id ");
    }else{
      var totalamount = 0;
      project.contributions = project.contributions || [];
      project.contributions.forEach(function(con){
        totalamount+=parseFloat(con.amount);
      })
      var progress = (totalamount / project.goal) * 100;
      progress = Number((progress).toFixed(2));
      var maxProgress = false;
      if(progress>=100){
        maxProgress=true;
      }
      res.render('project', {
        project: project,
        progress: progress,
        maxProgress: maxProgress,
        contribAmount: totalamount
      })
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE

  Project.findById(req.params.projectid,function(error,project){
    if(error){
      console.log("error finding project by id ");
    }else{
      req.checkBody('name','invalid contribution name').notEmpty();
      req.checkBody('amount','Invalid contribution amount').notEmpty().isInt();
      var errors = req.validationErrors();

      var totalamount = 0;
      project.contributions = project.contributions || [];
      project.contributions.forEach(function(con){
        totalamount+=parseFloat(con.amount);
      })

      if(errors){
        var progress = (totalamount / project.goal) * 100;
        progress = Number((progress).toFixed(2));
        var maxProgress = false;
        if(progress>=100){ maxProgress=true; }
        // console.log("found validation errors i ncontribution form");
        res.render('project',{
          errors: errors,
          project: project,
          progress: progress,
          maxProgress: maxProgress,
          contribAmount: totalamount
        })

      }else{

        var contrib = {name: req.body.name, amount: req.body.amount};
        project.contributions.push(contrib);
        // console.log("proj contributions", project.contributions);
        totalamount+=parseFloat(contrib.amount);
        var progress = (totalamount / project.goal) * 100;
        progress = Number((progress).toFixed(2));
        var maxProgress = false;
        if(progress>=100){
          maxProgress=true;
        }

        // console.log(project.contributions);

        project.save(function(error){
          if (error) {
            console.log("error on save");
            res.status(500).json(error);
          } else {
            console.log("saved");
            res.render('project',{
              // errors: errors,
              project: project,
              progress: progress,
              maxProgress: maxProgress,
              contribAmount: totalamount
            })
          }
        })

      }

    }
  })


});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  // YOUR CODE HERE
  var categories = Project.schema.path('category').enumValues;
  Project.findById(req.params.projectid,function(error,project){
    if(error){
      console.log("error finding project by id ");
    }else{
      var startdate = new Date(project.start);
      var remainingCategories = categories.filter(function(category){
        return category!==project.category;
      });
      res.render('editProject', {
        project: project,
        categories: remainingCategories,
        startdate: startdate

      })
    }
  })
});

router.post('/project/:projectid/edit', function(req, res) {
  // YOUR CODE HERE
  var categories = Project.schema.path('category').enumValues;
  req.checkBody(validationSchema);
  var errors = req.validationErrors();


  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    contributions: req.body.contributions,
    category: req.body.category
  },{new: true}, function(err,proj) {
      if(err){
        console.log("couldnt find project to edit",err);
        res.redirect('/');
      }
      if(errors){
        res.render('editProject',{
          errors: errors,
          categories: categories,
          project: proj
        })
      }else{
        res.render('project',{
          categories: categories,
          project: proj
        })
      }
  });

});


// Create the POST /project/:projectid/edit endpoint



module.exports = router;
