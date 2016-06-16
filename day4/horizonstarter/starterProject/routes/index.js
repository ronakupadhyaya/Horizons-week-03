var express = require('express');
var router = express.Router();

var models = require('../models/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Projects' });
});


router.get('/myUrl',function(req,res){
	models.project.find(function(error, mongoProjects){
		res.render('projects', {
			projects: mongoProjects
			
		});
	})
});

router.get('projects/:id',function(req,res){
	models.project.findbyId(req.params.id,function(error,project){
		if(error){
			res.status(400).send("Error reading project")
		}	
		else if(! mongoProject) {
			res.status(404).send('No such project: '+req.params.id)
		}
		res.render('singleProject', {
			'project':mongoProject
		})
	});
});

router.get('/new',function(req,res){
	res.render('new')
});

router.post('/new',function(req,res){
	new models.project({title: req.body.title});
	p.save(function(error){
		if(error){
			res.status(400).send("Error creating project: "+error);
		}
		else{
			res.redirect('/projects/'+projects._id);
		}
	})
})

router.get('/hello',function(req,res){
	res.send('hello');
});

//router.get('')

module.exports = router;
