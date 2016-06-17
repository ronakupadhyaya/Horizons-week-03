//Honestly this file is not needed. We can put everything in a app.js or main.js - but this is much more efficient
//and modular. 

var express = require('express');
var router = express.Router();

var models = require('../models/models')
    //when we want to render things - model is only good for rendering in the view

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'HorizonStarter' });
});

router.get('/projects', function(req, res) {
    models.project.find(function(error, mongoProject) {
        res.render('projects', {
            'projects': mongoProject
        })
    })
})

router.get('/projects/:id', function(req, res) {
    models.project.findById(req.params.id, function(error, mongoProject) {
        if (error) { res.status(400).send('Error reading project') } else if (!mongoProject) { res.status(404).send('No such project ' + req.body.id); } else
            res.render('singleProject', {
                'project': mongoProject
            })
    })
})

router.get('/new', function(req, res) {
    res.render('new');
});

router.post('/new', function(req, res) { //Need to create new things with Mongoose
    var p = new models.project({ 
      title: req.body.title,
      description: req.body.description,
      goal: req.body.goal,
      raised: req.body.raised,
      category: req.body.category,
      start_date: req.body.start_date,
      end_date: req.body.end_date 
    })
    p.save(function(error, project) { //CALLBACK! 
        if (error) { res.status(400).send('Error creating project') } //render the 404 page from app.js - the fallthrough route
        else {
            res.redirect('/projects/' + project._id); //redirects to just the id
        }
        //get requests in the query posts requests in the body
        //.title maps to main
    });
});

module.exports = router;
