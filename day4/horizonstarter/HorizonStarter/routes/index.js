var express = require('express');
var router = express.Router();
var Projects = require('../models/projects');

/* GET home page. */
router.get('/', function(req, res, next) {
	Projects.find({_id: req.params.id}, function(error,projects) {
		if (error) {
			console.log(error);
		}
		else {
			res.render('index', {projects: projects, title: 'Welcome to Horizon Kickstarter!'});
		}
	});
});


module.exports = router;
