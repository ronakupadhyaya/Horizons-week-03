var express = require('express');
var router = express.Router();

var models = require('../models/models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res) {
	res.send('Hello!');
})

router.get('/projects', function(req, res) {
	models.project.find(function(err, mongoProjects) {
		res.render('projects', {
			'projects': mongoProjects
		});
	})
})

router.get('/projects/:id', function(req, res) {
	models.project.findById(req.params.id, function(error, mongoProject) {
		if (error) {
			res.status(400).send('Error reading project ' + error);
		} else if (! mongoProject) {
			res.status(404).send('No such project ' + req.params.id);
		} else {
		res.render('singleProject', {
			'project': mongoProject
		});
		}
	})
})

router.get('/new', function(req, res) {
	res.render('new');
})

router.post('/new', function(req, res) {
	var p = new models.project({ 
		title: req.body.title,
		goal: req.body.goal,
		category: req.body.category,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		description: req.body.description 
	})
	p.save(function(error) {
		if(error) {
			res.status(400).send("Error creating project: " + error);
		} else {
			res.redirect('/projects');
		}
	})
})

module.exports = router;