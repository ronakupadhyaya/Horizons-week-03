var express = require('express');
var validator = require('express-validator');
var router = express.Router();
var mongoose = require('mongoose');

var models = require('../models/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Horizon Starter' });
});

router.get('/projects', function(req, res) {
	models.project.find(function(error, mongoProjects) {
		res.render('projects', {
			'projects': mongoProjects
		});
	})
	// res.send('here');
});

router.get('/projects/:id', function(req, res) {
	models.project.findById(req.params.id, function(error, mongoProject) {
		if (error) {
			res.status(400).send("Error reading project " + error);
		} else if (! mongoProject) {
			res.status(404).send("No such project: " + req.body.id);
		} else {
		// TODO handle missing project

		res.render('singleProject', {
			'project': mongoProject
		});}
	});
});

router.get('/new', function(req, res) {
	res.render('new');
});

router.post('/new', function(req, res) {
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('goal', 'Goal is required').notEmpty();
	req.checkBody('goal', 'Goal must be a number').isInt();
	req.checkBody('raised', 'Amount raised is required').notEmpty();
	req.checkBody('raised', 'Amount raised must be a number').isInt();
	req.checkBody('category', 'Category is required').notEmpty();
	req.checkBody('description', 'Description is required').notEmpty();
	req.checkBody('startDate', 'Start date is required').notEmpty();
	req.checkBody('startDate', 'Start date must be a date').isDate();
	req.checkBody('endDate', 'End date is required').notEmpty();
	req.checkBody('endDate', 'End date must be a date').isDate();
	var errors = req.validationErrors();

	var p = new models.project({
			title: req.body.title,
			goal: req.body.goal,
			raised: req.body.raised,
			category: req.body.category,
			description: req.body.description,
			startDate: req.body.startDate,
			endDate: req.body.endDate
			});
	p.save(function(error) {
	  if (error) {
		res.status(400).send("Error creating project: " + error)
	  } else {
	  	res.redirect('/projects/' + project._id);
	  }
	})
})


module.exports = router;
