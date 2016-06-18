var express = require('express');
var router = express.Router();

var models = require('../models/models');


// Each method calls 'get' or 'post' with a function that renders the given page

// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Horizonstarter' });
});

router.get('/myUrl', function(req, res) {
	models.project.find(function(error, mongoProjects) {
		res.render('projects', {
			projects: mongoProjects
		})
	})
})

// GET new projects form
router.get('/new', function(req, res) {
	res.render('new', {
		title: 'Create New Project',
		categories: models.projectSchema.path('category').enumValues.map(function (el) {
      return {val: el}
		})
	});
});

// POST a project
router.post('/new', function(req, res) {
	req.checkBody('title', 'Title is required').notEmpty();
  	req.checkBody('description', 'Description is required').notEmpty();

var errors = req.validateErrors();

if (errors) {

	// Don't fully understand why where data comes from
	res.render('new', {
		data: req.body,
      	categories: models.projectSchema.path('category').enumValues.map(function (el) {
        	// This is messy, but we can't have logic in handlebars.
        	return {
        		val: el, 
        		selected: el===req.body.category
        	};
      	}),
      flash: { type: 'alert-danger', messages: errors}
    });
 }
 else {
 	var project = new Project({
 	  title: req.body.title,
      goal: req.body.amount,
      category: req.body.category,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    });
 	// save new project once information is entered in
 	project.save(function(error) {
 		if (error) {
 			res.render('new', {
			data: req.body,
      		categories: models.projectSchema.path('category').enumValues.map(function (el) {
        	// This is messy, but we can't have logic in handlebars.
        	return {val: el, selected: el===req.body.category};
      		}),
     		flash: { type: 'alert-danger', messages: errors}
    		});
 		}
 		else {
 			res.redirect('/');
 		}
 	})
 }
});

// GET a project
router.get('/project/:projectid', function(res, req) {
	Project.findById(req.params.projectid, function(err, project) {

	// if an error is found, send an error
	// otherwise, render the project
    if (err) res.send(err);
    res.render('project', {
      project: project,
      // format the times separately

      // don't understand why %B is needed
      start: strftime('%B %d, %Y', project.start),
      end: strftime('%B %d, %Y', project.end)
    });
  });
});


// POST to a project (make contribution)
router.post('/project/:projectid', function(res, req) {

	// projects need to be found by id, similar to how comments were updated in facebook
	Project.findById(req.params.projectid, function(err, project) {

    if (err) res.send(err);

    // Validate entry fields
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('amount', 'Amount is required').notEmpty();
    req.checkBody('amount', 'Amount must be an integer').isInt();

    var errors = req.validationErrors();
    if (errors) {
      console.error(errors);
      res.render('project', {
        project: project,

        // format the times separately
        start: strftime('%B %d, %Y', project.start),
        end: strftime('%B %d, %Y', project.end),
        data: req.body,
        flash: { type: 'alert-danger', messages: errors}
      });
    }
    else {
      project.contributions.push({

      	// not certain where the body.name
        name: req.body.name,
        comment: req.body.comment,
        amount: req.body.amount
      });
      project.save(function(err) {
        console.error(err);
        var flash = err ?
          {type: 'alert-danger', messages: [{msg: err.message}]} :
          {type: 'alert-success', messages: [{msg: "Thanks for your contribution!"}]};
        res.render('project', {
          project: project,
          // format the times separately
          start: strftime('%B %d, %Y', project.start),
          end: strftime('%B %d, %Y', project.end),
          data: req.body,
          flash: flash
        });
      })
    }
  });
});

module.exports = router;
