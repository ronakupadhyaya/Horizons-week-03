var express = require('express');
var router = express.Router();
var models = require ('../models/models');
var mongoose = require('mongoose');

// Your routes here
router.get('/', function(req, res, next) {
  res.status(201).json({status: "success"});
});


router.get('/projects', function(req, res) {
	models.project.find(function(error, projects) {
		res.json(projects)
	})
});

router.get('/projects/:id/contributions', function(req, res) {
    models.project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(400).json({status: "error"})
        }
        else {
            res.json(project.contributions);
        }
    })
})


module.exports = router;