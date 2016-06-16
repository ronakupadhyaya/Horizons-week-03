var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var models = require('../models/models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mojia' });
});

router.get('/projects', function(req, res) {
  models.project.find(function(error, mongoProjects) {
    res.render('projects', {
      projects: mongoProjects
    })
  })
})

router.get('/projects/:id', function(req, res) {
  models.project.findById(req.params.id, function(error, mongoProject) {
    res.render('singleProject', {
      'project' : mongoProject
    })
  })
  // res.send('ID is ' + req.params.id + "Query id is " + req.query.id);
})

module.exports = router;
