"use strict";

var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Enable POST request body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable form validation with express validator.
var expressValidator = require('express-validator');
app.use(expressValidator());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/', function(req, res){
  res.redirect('/register');
});

// GET /register route
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res){
  res.render('register');
});

// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
//
// 1. Update register.hbs to display error messages in a readable way.
// 2. Pass in all the submitted user information (from req) when rendering profile.hbs
// 3. Update profile.hbs to display all the submitted user profile fields. This
//    profile should not be editable.
app.post('/register', function(req, res){
  // YOUR CODE HERE - Add express-validator validation rules here
  req.check('firstName','First name shouldn\'t be empty').notEmpty().withMessage('please key in firstname');
  req.check('middleInitial','Middle initial cannot be more than 1 letter').optional({ checkFalsy: true }).len(1).isAlpha();
  req.check('lastName','Last name shouldn\'t be empty').notEmpty();
  req.check('birthDate','User must be born before Jan 1,2010').optional({ checkFalsy: true }).isBefore('2010-1-1'); 
  //use string to specify year in this format '2014-06-15'
  req.check('password1','password cannot be empty').notEmpty();
  req.check('password2','password must match').matches(req.body.password1)
  req.check('gender','select gender').notEmpty();
  req.check('signup','sign up for Newsletter!').notEmpty();

  var errors = req.validationErrors(); // YOUR CODE HERE - Get errors from express-validator here
  if (errors) {
    res.render('register', {errors: errors,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleInitial: req.body.middleInitial,
      password1: req.body.password1,
      password2: req.body.password2
      });
      console.log(errors)
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    // console.log(req.body.birthDate);
    res.render('profile',{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleInitial: req.body.middleInitial,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      bio: req.body.bio,
      password1:req.body.password1
    });
    // console.log("SUCCESS!");
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
