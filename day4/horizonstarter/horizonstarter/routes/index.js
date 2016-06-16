var express = require('express');
var router = express.Router();

var models = require('../models/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/myUrl', function(req, res) {
	models.project.find(function(error) {
		res.render('projects', {
			projects: mongoProjects
		})
	})
})

module.exports = router;
