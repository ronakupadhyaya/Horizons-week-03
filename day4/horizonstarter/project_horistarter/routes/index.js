var express = require('express');
var router = express.Router();
var Project = require('../projects');

/* GET home page. */
router.get('/', function(req, res, next) {
	var projects = "";
	Project.find(function(err, projects) {
		if (err) res.send(err);
		// return the projects
		projects = projects;
		res.render('index', {
		    project: projects
		});
	});
});

module.exports = router;
