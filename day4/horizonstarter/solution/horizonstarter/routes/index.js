"use strict";

var express = require('express');
var router = express.Router();
var Project = require('../model/project');

/* GET home page. */
router.get('/', function(req, res, next) {

  Project.find(function(err, projects) {
    if (err) res.send(err);
    res.render('index', { projects: projects });
    // res.json(projects);
  });
  
});

module.exports = router;
