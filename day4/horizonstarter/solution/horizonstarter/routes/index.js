"use strict";

var express = require('express');
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

module.exports = router;
