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

router.get("/projects/new", function(req, res){
	res.render("new");
});

router.post("/projects/new", function(req, res){
	console.log("data", req.body);
	req.body.raised = 0;
	var p = new models.project(req.body);
	p.save(function(error, project){
		if(error){
			res.status(400).send(error);
		} else {
			res.redirect('/projects');
		}
	});
	// res.send("yup");
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

router.post('/projects/:id', function(req, res){

	models.project.findByIdAndUpdate(req.params.id, {
		$push: {
			contributions: {
				name: req.body.name,
				amount: req.body.amount,
				comment: req.body.comment,

			}
		},
		$inc: {
			raised: req.body.amount
		}
	}, function(error, mongoProject){
		console.log(mongoProject);
		if(error){
			res.status(400).send;
		} else{
			res.redirect("/projects/" + req.params.id);
		}
	});
});


router.get("/login", function(req, res){
	res.render("login");
});

module.exports = router; // w/ node, you have to explicitly eport things that you want to use elsewhere

//module.exports = bla bla bla
//require only returns a single value
//common pattern: module.exports = {} -> so that require can return an object with multiple things, as opposed to returning a single value
