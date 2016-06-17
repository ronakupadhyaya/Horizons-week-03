var express = require('express');
var router = express.Router();

var project = require('../model/project')

router.get('/:id', function(req, res, next) {
	var projectId = req.params.id;
	project.find({_id: projectId},function(error, ourProj) {
		if (error) {
			console.log(error)
		} else {
			console.log(ourProj)
			res.render('projectPage.hbs', {
				projects: ourProj
			})
		}
	})
});
router.post('/:id', function(req, res, next) {
	var projectId = req.params.id;
	project.find({_id: projectId},function(error, ourProj) {
		if (error) {
			console.log(error)
		} else {
			var arr = ourProj[0].donations
			arr.push(req.body)
			ourProj[0].update({donations: arr}, function(error) {
				if (error) {
					console.log(error)
				}
			})
			res.render('projectPage.hbs', {
				projects: ourProj
			})
		}
	})
});

module.exports = router;