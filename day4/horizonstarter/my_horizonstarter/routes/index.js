var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var models = require('../models/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', layout: "layoutHome.hbs"});
});

router.get('/projects', function(req, res) {
    models.project.find(function(error, mongoProjects){
        res.render('projects', {
            'projects':mongoProjects
        })
    });
});

router.get('/projects/:id', function(req, res) {

    models.project.findById(req.params.id, function(error, mongoProject) {
        console.log("errors", error)
        if(error) {
          res.status(400).send("Error reading project");
        } else if (! mongoProject) {
          res.status(404).send('No such project: ' + req.params.id);
        } else {
          console.log(mongoProject);
          res.render('singleProject', {
            'project': mongoProject
          });
        }
    });
});

router.get('/new', function(req, res) {
  res.render('new');
});

function validate(req) {
  req.checkBody('title', 'Invalid title').notEmpty();
  req.checkBody('description', 'Invalid description').notEmpty();
  req.checkBody('category', 'Invalid category').notEmpty();
  req.checkBody('goal', 'invalid amount').notEmpty().isInt();
  req.checkBody('start', 'Invalid start date').notEmpty();
  req.checkBody('end', 'Invalid end date').notEmpty();
}

function validateContribution(req) {
  req.checkBody('name', 'Invalid name').notEmpty();
  req.checkBody('amount', 'Invalid amount').notEmpty().isInt();
}



router.post('/new', function(req, res) {
  validate(req);
  
  var errors = req.validationErrors();
  if(errors) {
    res.render('new', {errors: errors});
    
  } else {
    var p = new models.project({
      title: req.body.title,
      description: req.body.description,
      goal: req.body.goal,
      category: req.body.category,
      start: req.body.start,
      end: req.body.end

    });
    p.save(function(error, project) {
      if (error) {
        res.status(400).send("Error creating project " + error);
      } else {
        res.redirect('/projects/' + project._id);
      }
    })
  }
});

router.post('/projects/:id', function(req, res) {
  validateContribution(req);

  var errors = req.validationErrors();
  if(errors) {
    console.log(errors);
    res.render('singleProject', {errors: errors});
  } else {
    models.project.findById(req.params.id, function(err, project) {
      console.log("project: " + project);
      project.contributions.push({
        name: req.body.name,
        comment: req.body.comment,
        amount: req.body.amount
      });
      project.amount += parseInt(req.body.amount);
      project.save(function(err, p) {
        res.redirect('/projects/' + project._id);
      });
    })
  }
})

module.exports = router;
