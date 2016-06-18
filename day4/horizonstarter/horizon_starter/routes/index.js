var express = require('express');
var router = express.Router();

var models = require('../models/models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/projects');
});

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
	var date = new Date();
	var p = new models.project({ 
		title: req.body.title,
		goal: req.body.goal,
		category: req.body.category,
		startDate: date,
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

router.post('/projects/:id', function(req, res) {
	var date = new Date();
	var c = new models.contribution({
		name: req.body.name,
		amount: req.body.amount,
		note: req.body.note,
		date: date
	})
	models.project.findByIdAndUpdate(req.params.id, {
		$inc: {
			raised: req.body.amount
		}
	}, function(error) {
		if (error) {
			res.send(error);
		}
	})

	models.project.findById(req.params.id, function(error, mongoProject) {
		if (error) {
			res.send(error)
		} else {
			mongoProject.contributions.push(c);
			mongoProject.progress = (mongoProject.raised / mongoProject.goal) * 100;
			mongoProject.save();
		}
	})
	c.save(function(error) {
		if(error) {
			res.status(400).send("Error creating project: " + error);
		} else {
			res.redirect('/projects/' + req.params.id);
		}
	})
})

module.exports = router;












