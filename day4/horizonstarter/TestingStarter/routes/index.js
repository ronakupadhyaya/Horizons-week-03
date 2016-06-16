var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var models = require('../model/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/projects', function(req,res){

	models.project.find(function(error, mangoProjects){
	res.render('projects', {
		'projects': mangoProjects
	});
	})
})

router.get('/projects/:id', function(req, res){
	// res.send('Id is ' + req.params.id);
	models.project.findById(req.params.id, function (error, mangoProject){
	if(error){
		res.status(400).send('Error reading project ' + error);
	} else if(!mangoProject){
		res.status(400).send('No such project: ' + req.param.id);
	} else{
		res.render('singleProject', {
			'project': mangoProject
		});
		}
	});
});

router.get('/new', function(req,res){
	res.render('new');
})
router.post('/new', function(req,res){
	var p = new models.project({title: req.body.title, description: req.body.description});
	p.save(function(error, project){
		if(error){
			res.Status(400).send("Error creating project: " + error);
		}
		else{
			res.redirect('/projects/' + project._id);
		}
	})
})


router.get('hello', function(req,res){
	res.send('Hello there!');
});

module.exports = router;
