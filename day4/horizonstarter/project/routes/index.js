var express = require('express');
// var mongoose = require('mongoose'); don't need anymore
var router = express.Router();

var models = require('../models/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/projects', function(req, res) {
	models.project.find(function(error, mongoProjects) {
		res.render('projects', {
			projects: mongoProjects
		});
	})
});

router.get('/projects/:id', function(req, res) {
	models.project.findById(req.params.id, function(error, mongoProject) {
		//TODO handle missing project
		if (error)  {
			res.status(400).send('Error reading project' + error);
		} else if (! mongoProject) {
			res.status(404).send('No such project: ' + req.params.id);
		}	else {
		res.render('singleProject', {
			'project': mongoProject
		});

}
});	
});

router.post('/projects/:id', function(req, res) {
	var projectId = req.params.id;
	var c = new models.contribution({
		name: req.body.name,
		comment: req.body.comment,
		amount: req.body.amount
	});
	c.save(function(error, contribution) {
		if (error) {
			res.status(400).send("Error donating to project: " + error);
		} else {
			res.redirect('/projects/' + projectId);
		}
	})
});

router.get('/new', function(req, res) {
	res.render('new');
});

router.post('/new', function(req, res) {
	var p = new models.project({
		title: req.body.title,
		description: req.body.description,
		category: req.body.category,
		goalAmount: req.body.goalAmount,
		startDate: req.body.startDate,
		endDate: req.body.endDate
	});
	p.save(function(error, project) {
		if (error) {
			res.status(400).send("Error creating project: " + error);
		} else {
			res.redirect('/projects/' + project._id);
		}
	})

});

router.get('hello', function(req,res) {
res.send('Hello there!');
});

module.exports = router;
