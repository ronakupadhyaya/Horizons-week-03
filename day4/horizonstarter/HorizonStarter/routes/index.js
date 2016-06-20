var express = require('express');
var router = express.Router();
var Project = require('../model/project');

//Get Homepage with title and all projects
router.get('/', function(req, res, next) {
	Project.find( function(error, projects) {
		if (error) {
			res.send(error);
		} else {
			res.render('index', {projects: projects, title: 'Welcome to Horizon Starter!'});
		}
	});
});
//Get new project form
router.get('/new', function(req, res) {
  res.render('new');
});

//Validate
function validate(req) {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('amount', 'Amount is required').notEmpty();
  req.checkBody('amount', 'Amount must be an integer').isInt();
  req.checkBody('category' , 'Category is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  req.checkBody('start','Start date is required').notEmpty();  
  req.checkBody('start','Start date is required').isDate();
  req.checkBody('end', 'End date is required').notEmpty();
  req.checkBody('end', 'End date is required').isDate();  
}
//Post new form
router.post('/new', function(req, res) {
	validate(req);
    var errors = req.validationErrors();
    if (errors) {
    	console.log(errors);
    	res.render('new', {errors: errors});
    } else {
    	var project = new Project({
    		title: req.body.title,
    		goal: req.body.amount,
    		category: req.body.category,
    		description: req.body.description,
    		start: req.body.start,
    		end: req.body.end
    	});
    }
    project.save(function(error){
    	if (error) {
    		console.log(error);
    		res.render('new',{errors: errors});
    	} else {
    		res.redirect('/');
    	}
    })
});
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(error, project) {
    if (error) {
    	res.send(error);
    }
    res.render('project', {
      project: project,
      start: project.start,
      end: project.end
    });
  });
});
router.post('/project/:_id', function(req, res) {
  Project.findById(req.params._id, function(error, project) {
    if (error) res.send(error);

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('amount', 'Amount is required').notEmpty();
    req.checkBody('amount', 'Amount must be an integer').isInt();
    var errors = req.validationErrors();
    if (errors) {
    	console.error(errors);
    	res.render('project', {
    		project: project,
    		data: req.body
    	});
    } else {
      project.contributions.push({
        name: req.body.name,
        comment: req.body.comment,
        amount: req.body.amount
      });
      project.save(function(error) {
        console.error(error);
        res.render('project', {
          project: project,
          start: req.body.start,
          end: req.body.end,
          data: req.body
        });
      });
    }
  });
});


module.exports = router;
