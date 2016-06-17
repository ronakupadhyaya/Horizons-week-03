var express = require('express');
var router = express.Router();

var models = require('../model/project')
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
	models.find(function(error, projects) {
		res.render('projects', {
			projects: projects
		})
	})
});

module.exports = router;
