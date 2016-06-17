var express = require('express'); //whoever requires

var mongoose = require('mongoose');
//get something from url, turn into query object

//is going to get this back
var router = express.Router();
 //getting slash, rendering index, exports router

var models= require('../models/models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Horizon Starter' });
  var p = new models.project({title: req.body.title,
  	description: req.body.description, goal: req.body.goal, percent:"0"})
});

router.get('/projects', function(req,res){
	//if searching by category
	if(req.query.category){
		 models.project.find({'category': req.query.category}, function(error, mongoProjects){
		 	res.render('projects', {
		 		'projects': mongoProjects
		 	});
		 });
		 return;
	}
	
	//for archiving complete projects
	if(req.query.complete){
		//console.log(true)
		models.project.find({'complete':true}, function(error, mongoProjects){
			res.render('projects', {
				'projects': mongoProjects
			})
		})
		return;
	}

	if(req.query.goal){
		//console.log(true)
		models.project.find(function(error, mongoProjects){
		if(mongoProjects.goal>= req.query.goal){
			res.render('projects', {
				'projects': mongoProjects
			})
		}
		})
		return;
	}

	///for all active projects
	models.project.find({'complete': false}, function(error, mongoProjects){
		res.render('projects',{
			'projects': mongoProjects //projects back from mongo
		}); //^^handle projects
		//want to list projects
	})
})

router.post('/categories', function(req,res){
	res.redirect('/posts?category='+res.query)
})

router.post('/projects/', function(req,res){
	res.redirect('/projects='+res.body)
})

router.get('/projects/:id', function(req,res){
	//TODO handle missing projects//
	//query: only things AFTER quetion mark in url,
	//params before... : makes is a param variable
	//use id because want to make it a project id
	//res.send('param id is '+req.params.id+"\nQuery is is "+req.query.id)
	models.project.findById(req.params.id, function(error,mongoProject){
	if(error){
		res.status(400).send('Error reading project '+ error);
	}
	else if (!mongoProject){
		res.status(404).send('Error reading project: '+ req.params.id)
	}
	else{
		res.render('singleProject', {
			'project': mongoProject
		})
	}
	})
})

router.get('/new',function(req,res){
	//get requests in quesru
	res.render('new')
})

router.post('/new', function(req, res){
	//post requests in body
	var p = new models.project({title: req.body.title ,description: req.body.description, goal: req.body.goal,
		user: req.body.user, raised: "0", percent: "0", category: req.body.category,
		date: req.body.date, complete: false})
	p.save(function(error,project){
	if(error){
		res.status(400).send("Error creating project: "+error)
	}
	else {
		res.redirect('/projects')
	}
	})
})

router.post('/projects', function(req,res){
	console.log(res.query)
	res.redirect('../new')
})

router.get('/categories', function(req,res){
	res.render('categories')
})

router.post('/projects/:id', function(req,res){
	models.project.findById(req.params.id, function(error, mongoProject){
		if(error){
			res.status(400).send('Error reading project '+ error);
		}
		else if(!mongoProject){
			res.status(404).send('Error reading project: '+ res.params.id)
		}
		else{
			//add the raised amount 
			mongoProject.raised= (parseFloat(mongoProject.raised) + parseFloat(req.body.donation)).toString();
			mongoProject.percent= (parseFloat(mongoProject.raised)/parseFloat(mongoProject.goal)*100).toString();
			mongoProject.save()
			res.redirect('/projects/' + mongoProject._id)
		}
	})
})


router.get('/hello', function(req, res){
	res.send('Hello there')
})
module.exports = router; //if you have 2 scripts, allows for
//one string to be required by the other (can get one thing
//out of the other)

//node: have to explicitly export things to be used....
//can do so with module.export, can require/return
//set values in other windows

//require: runs all the code and returns whatever module.export
//is set to in another part

// require only returns single value... but can set module.export
//as an object with items in keys to return multiple values
//if multiple: require(file.key) to return element of key
