var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var models = require('../models/models');

var router = express.Router();

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
        
// if statements that crashed
        res.render('singleProject', {
            'project': mongoProject
        })
    });
});

router.post('/projects/:id', function(req, res) {
  var id = req.params.id;
  var contributionsData = req.body
  models.project.findById(id, function(err, project) {
    console.log(project);
    console.log(project.contributions)
    project.contributions.push({
      name: req.body.name,
      comment: req.body.comment,
      amount: req.body.amount
    });
    project.save(function(error, project) {
      if (error) {
    res.status(400).send("Error creating project: " + error);      
    } else {
      res.redirect('/projects/' + project._id);
    }
    })
  })
});

router.get('/new', function(req, res) {
  res.render('new');
});

router.post('/new', function(req, res) {
  var p = new models.project({ title: req.body.title});
  p.save(function(error, project) {
  	if (error) { 
  		res.status(400).send("Error creating project: " + error);
  	} else {
  		res.redirect('/projects/' + project._id);
  	}
  })
});

router.get('/hello', function(req, res) {
	res.send("Hello world!");
});

module.exports = router;
