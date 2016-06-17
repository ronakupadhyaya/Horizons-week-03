var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/', function(req, res, next) {
	models.project.find(function(error, projects) {
		res.render('projects', {
			projects: projects
		})
	})
});
router.get('/', function(req, res, next) {
	models.project.find(function(error, contributions) {
		res.render('projects', {
			contributions: contributions
		})
	})
  
});


module.exports = router;
