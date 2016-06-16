var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var models = require('../models/models');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Katssnipppppp' });
// });

router.get('/katstarter', function(req, res) {
	models.project.find(function(error, mangoProjects) {
		res.render('projects', {
			'projects': mangoProjects
		})
	})
});

router.get('/new', function(req, res) {
	res.render('new');
});

router.post('/new', function(req, res) {
	var p = new models.project({title: req.body.title,
								category: req.body.cat,
								goal: req.body.goal,
								total: 0,
								start: req.body.start,
								end: req.body.end});
	p.save(function(err, mangoProjects) {
		if(err) {
			res.status(400).send("Error reading project");
		} else {
			res.redirect('/katstarter/' + mangoProjects._id);
		}
	})
});

router.get('/katstarter/:id', function(req, res) {
	models.project.findById(req.params.id, function(error, mangoProjects) {
		if(error) {
			res.status(400).send("Error reading project");
		} else if(! mangoProjects) {
			res.status(404).send('No such project: ' + req.params.id);
		} else {
			res.render('singleProject', {
				'project': mangoProjects
			})
		}
	});
});




module.exports = router;
