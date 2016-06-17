var express = require('express');
var router = express.Router();

var models = require('../models/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/projects', function(req, res) {
  models.project.find(function(error, mongoProjects) {
    res.render('projects', {
      'projects': mongoProjects
    });
  })
});

router.get('/projects/:id', function(req, res) {
  models.project.findById(req.params.id, function(error, mongoProject) {
    if (error) {
      res.status(400).send('Error reading project ' + error);
    } else if (! mongoProject) {
      res.status(404).send('No such project: ' + req.params.id);
    } else {
      res.render('singleProject', {
        'project': mongoProject
      });
    }
  });
});

router.get('/new', function(req, res){
  res.render('new');
});

router.post('/new', function(req, res) {
  var p = new models.project({ title: req.body.title });
  p.save(function(error, project) {
    if (error) {
      res.status(400).send("Error creating project: " + error);
    } else {
      res.redirect('/projects/' + project._id);
    }
  })
});

router.get('/hello', function(req, res) {
  res.send('Hello there!');
});

module.exports = router;
