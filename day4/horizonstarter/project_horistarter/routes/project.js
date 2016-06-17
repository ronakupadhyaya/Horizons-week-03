var express = require('express');
var router = express.Router();
var Project = require('../projects');

/* GET home page. */
router.get('/:project_id', function(req, res) {
	Project.findById(req.params.project_id, function(err, p) {
		var project;
		if (err) res.send(err);
		project = p;
		console.log(project);
		res.render('post', {
		    project: p
		});
	});
});

module.exports = router;
