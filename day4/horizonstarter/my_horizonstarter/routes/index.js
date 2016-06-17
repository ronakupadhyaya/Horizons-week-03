var express = require('express');
//add this -- require mongoose so that you can convert id into a mongoose object
var mongoose = require('mongoose');
var router = express.Router();

//require only works with javascript files, so the js is implied
//not the current directory, but one up and one in 
var models = require ('../models/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//"mongoProjects" are the projects getting back from mongo. So that's what we use
// in the handelbars template (or is it projects? ugh)

//'/projects' is a route, the next part of the url and stuff
router.get('/projects', function(req, res) {
	models.project.find(function(error, mongoProjects) {
		res.render('projects', {
			'projects': mongoProjects
		});
	})
});

//so anything after the slash goes into the id... so if you do like
//localhost/projects/hello, this will tell you id is hello
//query comes after the question mark
//so projects/hello?id=annie will say Id is hello, query id is annie

// router.get('/projects/:id', function(req, res) {
// 	res.send('Id is ' + req.params.id + "Query id is " + req.query.id);
// });

//Now we want to query by id. Use the "require" from mongoose and turn the id into
//an object to query with. Jk, don't need mongoose!

//this is just a single thing, whereas the other one (above this) was an array

//so this gets a single project... but only if the URL is inserted. user shouldn't
//have to type in a URL...

//Nowwww we gotta make a view for singleProject
//View file with just Project: {{project.title}} -- need the project.title
//because we don't have an each statement?

// Instead, you could do like just {{title}} instead of the link, but you'd have
// to go into mongoose and get the ID and hard code it into the URL. This way,
// it updates based on what is clicked. 
// THIS IS FOR THE PROJECTS.HBS FILE

router.get('/projects/:id', function(req, res) {
	models.project.findById(req.params.id, function(error, mongoProject) {
		//TODO handle missing project
		if (error) {
			res.status(400).send('Error reading project ' + error);
		} else if (! mongoProject) {
			res.status(404).send('No such project ' + req.param.id);
		} else {
			res.render('singleProject', {
				'project': mongoProject
			})
		}
	});
});

router.get('/hello', function(req, res, next) {
  res.send("hello!");
});

router.get('/new', function(req,res){
	res.render('new');
})

router.post('/new', function(req,res){
	var p = new models.project({ 
		title: req.body.title,
		description: req.body.description,
		category: req.body.category,
		amount: req.body.amount,
		startdate: req.body.startdate,
		enddate: req.body.enddate,
		funded: 0,
		contributions: []
	});
	p.save(function(error, project)  {
		if (error) {
			res.status(400).send("Error creating project: " + error)
		} else {
			//takes you back to projects so you can see it in the list. can also
			//redierct you to the project you just created, by taking you back
			//to the url for a single project -- /projects/id ('/projects/' + project_id')
			res.redirect('/projects/' + project._id);
		}
	}) 
})

router.post('/projects/:id', function(req, res) {
    models.project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(400).send("Error: found an error")
        }
        else {
            project.funded += parseInt(req.body.donation);
           	project.contributions.push({'name': req.body.name, 'comment': req.body.comment, 'donation': req.body.donation})
            project.save(function(err) {
                if (err) {
                    res.status(400).send("Error: couldn't save")
                }
                else {
                    res.redirect('/projects/' + project._id);
                }
            })
        }
    })
})

module.exports = router;
