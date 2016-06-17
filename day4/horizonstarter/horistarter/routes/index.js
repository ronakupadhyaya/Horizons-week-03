var express = require('express');
// var mongoose = require('mongoose');
var router = express.Router(); //way of grouping endpoints together

var models = require('../models/models');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/projects'); //values within context object shared between all hbs files (index, layout, etc.)
});

router.get('/projects', function(req, res){
	models.project.find(function(error, mongoProjects){
		
		res.render('projects', {
			'projects': mongoProjects
		});
	});
});


router.get('/projects/:id', function(req, res){ //b4 question mark is params, after question mark is id
	models.project.findById(req.params.id, function(error, mongoProject){
		if(error){
			res.status(400).send(error);
		} else{
			res.render('singleProject', {
			'project': mongoProject
			});
		}
	});
});

router.get("projects/new", function(req, res){
	res.render("new");
});

router.post("projects/new", function(req, res){
	var p = new models.project(req.body);
	p.save(function(error, project){
		if(error){
			res.status(400).send(error);
		} else {
			res.redirect('/projects');
		}
	});
});

module.exports = router; // w/ node, you have to explicitly eport things that you want to use elsewhere

//module.exports = bla bla bla
//require only returns a single value
//common pattern: module.exports = {} -> so that require can return an object with multiple things, as opposed to returning a single value
