var express = require('express');
var mongoose = require('mongoose');
var router = express.Router(); //this is a way of grouping endpoints together
var models = require('../models/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/projects', function(req,res){
  models.project.find(function(error,mongoProjects){
    if (error){
      res.status(400).send('Error reading project '+ error);
    }else if (! mongoProjects){
      res.status(404).send('No such page');//before question mark = param, after question mark = query
    }else{
    res.render('projects',{
      'projects': mongoProjects
    });
    }
  });
});

router.get('/projects/:id', function(req, res){
  models.project.findById(req.params.id, function(error, mongoProject){
    if (error){
      res.status(400).send('Error reading project '+ error);
    }else if (! mongoProject){
      res.status(404).send('No such project: '+req.body.id);//before question mark = param, after question mark = query
    }else{
    res.render('singleProject',{
      'singleProject': mongoProject
    });
    }
  });//params refer to the id in the link
});

router.get('/new', function(req,res){
  res.render('new');
});

router.post('/new', function(req,res){
  var p = new models.project({
    title: req.body.title,
    description: req.body.description,
    goal: req.body.goal,
    category: req.body.category,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  });//post request in the body
  p.save(function(error, project){
    if (error){
      res.render('new', {
        data: req.body,
        categories: Project.schema.path('category').enumValues.map(function (el) {
          // This is messy, but we can't have logic in handlebars.
          return {val: el, selected: el===req.body.category};
        }),
        flash: { type: 'alert-danger', messages: [{msg: err.message}]}
      });
    }else{
      res.redirect('/projects/'+ project._id);
    }
  })
});

router.get('/hello', function(req,res){
  res.send('Hello there!');
});

module.exports = router; //nothing will come out if this wasn't here, make visible to modules outside
//js files on browser can see all variables in other js files, but node modules can't
//use exports to get multiple pieces of information
//when u call require in another script, it gets the values only in the module.exports function


//to get localhost:3000 to show up: 1) open up terminal and get to the right folder 2) then do npm install 3) do npm start 4) then open up localhost:3000

//to create a new project:
//$ express --hbs project

//to remove a project
//$rm -rm my_horizon

//$npm install --save nodemon
