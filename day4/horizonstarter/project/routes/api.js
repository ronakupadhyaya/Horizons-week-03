var express = require('express');
var router = express.Router();
var Project = require('../models/models.js')
// means get from /api/blah
// router.get('/blah', function() {


// });

router.post('/project/:id/contribute', function(req, res) {
	var update = {
		$push: {
			contributions: req.body
		}
	};
	Project.findByIdAndUpdate(req.params.id, update, function(error, project) {
		if (error) {
			res.status(400).json(error);
		} else {
			res.json(project);
		}
	});
});

module.exports = router;
