var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var models = require('../models/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
  req.checkBody('amount', 'invalid amount').notEmpty().isInt();
  req.checkBody('start', 'Invalid start date').notEmpty();
  req.checkBody('end', 'Invalid end date').notEmpty();
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
      amount: req.body.amount,
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

module.exports = router;
