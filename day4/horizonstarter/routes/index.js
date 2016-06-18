var express = require('express');
var router = express.Router();

var models = require('../models/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  	models.project.find(function(error, mongoProjects) {
		res.render('projects', {
			'projects': mongoProjects,
		}
	)});
});

router.get('/projects', function(req, res) {
	models.project.find(function(error, mongoProjects) {
		res.render('projects', {
			'projects': mongoProjects,
		}
	)});
}	
);

router.get('/projects/:id', function(req, res) {
	models.project.findById(req.params.id, function(error, mongoProject) {
		if (error) {
			res.status(400).send('Error reading project ' + error);
		} else if (! mongoProject) {
			res.status(404).send('No such project: ' + req.params.id);
		} else {
			models.contribution.find({projectid: req.params.id}, function(error, contributions) {
				if(error) {
					res.status(400).send('Error reading contribution' + contribution);
				} else if (! contributions) {
					res.status(404).send('No contributions for this project');
				} else {
					res.render('singleProject', {
						'project': mongoProject,
						'contributions': contributions
					})
				}
			})
		 }
	})
});

router.get('/hello', function(req, res) {
	res.send('Hello there!');
});

router.get('/new', function(req, res) {
	res.render('new');
})

router.post('/new', function(req, res) {
	var p = new models.project({
		title: req.body.title,
		description: req.body.description,
		category: req.body.category,
		goal: req.body.money,
		start: req.body.start,
		end: req.body.end
	})
	p.save(function(error, project){
		if (error) {
			res.status(400).send("Error creating project: " + error)
		} else {
			res.redirect('/projects/' + project._id);
		}
	})
})


router.post('/projects/:id', function(req, res) {
	var c = new models.contribution({
		name: req.body.name,
		comment: req.body.comment,
		amount: req.body.amount,
		projectid: req.params.id
	})
	c.save(function(error, project) {
		if(error) {
			res.status(400).send("Error making coontribution: " + error)
		} else {
			res.redirect('projects/' +req.params.id);
		}
	})
})

module.exports = router;
