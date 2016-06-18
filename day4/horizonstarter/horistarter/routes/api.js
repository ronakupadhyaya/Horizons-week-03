var express = require('express');
var Project = require('../models/models').project;
var router = express.Router();

router.post('/project/:id/contribute', function(req, res) {
	var update = {
		$push: {
			contributions: req.body
		}
	};
	console.log(req.body);
	Project.findByIdAndUpdate(req.params.id, update, function(error, project) {
		if(error){
			res.status(400).send(error);
		} else {
			res.json(project);
		}
	});
});

module.exports = router;