"use strict";

var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Enable form validation with express validator.
var expressValidator = require('express-validator');
app.use(expressValidator());

// Enable POST request body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
   // YOUR CODE HERE - Get errors from express-validator here
  req.check('firstName', 'must enter a first name').notEmpty();
  req.check('middleInitial', 'must be only 1 letter').isLength({
    min: 1,
    max: 1
  });
  req.check('lastName', 'must enter a last name').notEmpty();
  req.check('dateOfBirth', 'must be a date in the present').isBefore();
  req.check('password', 'must enter a password').notEmpty();
  req.check('password2', 'must match password').equals(req.body.password);
  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {errors: errors});
  } else {
    console.log(req.body.radio);
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    res.render('profile', {
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      password: req.body.password,
      password2: req.body.password2,
      gender: req.body.radio,
      newsLetter: req.body.newsLetter,
      bio: req.body.bio,
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
