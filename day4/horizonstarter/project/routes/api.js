var express = require('express');
var router = express.Router();
var models = require('../models/models.js')
// means get from /api/blah
// router.get('/blah', function() {


// });

// router.post('/project/:id/contribute', function(req, res) {
// 	var update = {
// 		$push: {
// 			contributions: req.body
// 		}
// 	};
// 	Project.findByIdAndUpdate(req.params.id, update, function(error, project) {
// 		if (error) {
// 			res.status(400).json(error);
// 		} else {
// 			res.json(project);
// 		}
// 	});
// });


// ------


router.post('/projects/:id/contribute', function(req, res) {
	var projectidFromParams = req.params.id;
	var c = new models.contribution({
		name: req.body.name,
		comment: req.body.comment,
		amount: parseInt(req.body.amount),
		projectId: projectidFromParams
	});
	var update = {
		$inc: {
			totalContribution: parseInt(req.body.amount)
		}
	}
	models.project.findByIdAndUpdate(req.params.id,update, function(error, projectfromMongo) {
		if (error) {
			res.status(400).json(error);
		} 
	});
	c.save(function(error, contribution) {
		if (error) {
			res.status(400).json("Error donating to project: " + error);
		} else {
			models.contribution.find({projectId: projectidFromParams}, function(error, mongoContributions) {
				models.project.findById(req.params.id, function(error, mongoProject) {
				var percentage = (mongoProject.totalContribution/mongoProject.goalAmount)*100;
				res.json({
					'project': mongoProject,
					'contributions': mongoContributions
			});
			});
			});
			
		}
	})
});


module.exports = router;
