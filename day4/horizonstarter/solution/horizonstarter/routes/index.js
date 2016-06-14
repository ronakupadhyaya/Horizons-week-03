"use strict";

var express = require('express');
var validator = require('express-validator');
var router = express.Router();
var Project = require('../model/project');

/* GET home page. */
router.get('/', function(req, res, next) {

  Project.find(function(err, projects) {
    if (err) res.send(err);
    res.render('index', {projects: projects, title: "Horizon Starter"});
    // res.json(projects);
  });

});

// GET New project form
router.get('/new', function(req, res, next) {
  res.render('new', {title: "Create new project"});
});

// POST new project
router.post('/new', function(req, res, next) {
  req.checkBody('title', 'Title is required').notEmpty();
  var errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    res.render('new', { flash: { type: 'alert-danger', messages: errors }});
  }
  else {
    res.render('new', { flash: { type: 'alert-success', messages: [ { msg: 'No errors!' }]}});
  }
  // console.log('Title: ' + req.body.title);
  // console.log('Description: ' + req.body.description);
});

module.exports = router;
