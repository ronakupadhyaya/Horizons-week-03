var express = require('express');


// way to group end points together
// normally we do app.get app.post
// if we wanted to group them and pass them along
// we would use a routher object
var router = express.Router();

// when you define routes, make sure to put them here

// we do not need to add .js with require because require only works with JS files
var models = require('../models/models');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Horizon Starter' });
});

router.get('/projects', function(req, res, next) {
	models.project.find(function(err, mongoprojects){
		res.render('project', {
			projects: mongoprojects
		});
	})
});

router.get('/projects/new', function(req, res, next) {
	res.render('new');
});

router.post('/projects/new', function(req, res){

	var title = req.body.title;
	var desc = req.body.description;
	var category = req.body.category;
	var goal = req.body.goal;
	var start = req.body.startDate;
	var end = req.body.endDate;

	console.log("TESTING", title, desc, start)

	var newProject = new models.project(
		{
			title: title,
			description: desc,
			category: category,
			goal: goal,
			startDate: start,
			endDate: end,
			raised:0
		});

	var id;

	newProject.save(function(err, success){
		if (err) {
			console.log(err);
		}
		else {
			id = success._id;
			console.log(success);
		}
	})

	res.redirect('/projects/'+id)
})


router.get('/projects/:id', function(req, res, next) {
	models.project.findById(req.params.id, function(error, mongoProject){
		res.render('singleProject', {
			'project': mongoProject
		});
	})

	router.post('/projects/:id', function(req, res, next){
		var name = req.body.contributor;
		var comment = req.body.comments;
		var contribution = req.body.contribution;
	});
});



module.exports = router;
