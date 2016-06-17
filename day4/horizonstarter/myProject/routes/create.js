var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var models = require('../model/project')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create.hbs')
})

router.post('/', function(req, res, next) {
	var newProject = new models({
		title: req.body.title,
		description: req.body.description,
		category: req.body.category,
		goal: req.body.goal,
		startDate: req.body.startDate,
		endDate: req.body.endDate
	})
	newProject.save();
	res.redirect('/')
})
module.exports = router;
