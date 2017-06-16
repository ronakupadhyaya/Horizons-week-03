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
  // var errors; // YOUR CODE HERE - Get errors from express-validator here
  req.checkBody('firstname', 'First name is required').notEmpty();
  req.checkBody('middleinitial', 'Middle initial must be a single letter').isLength({
    max: 1
  });
  req.checkBody('lastname', 'Last name is required').notEmpty();
  req.checkBody('dob', 'DOB must be a date in the past').isBefore();
  req.checkBody('password', 'Password must not be empty').notEmpty();
  req.checkBody('rpassword', 'Repeat password must not be empty and it should match the password field').notEmpty().matches(req.body.password);
  req.checkBody('signup', 'Checkbox must not be blank').notEmpty();
  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.render('register', {errors: errors});
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    res.render('profile', {
      firstname: req.body.firstname,
      middleinitial: req.body.middleinitial,
      lastname: req.body.lastname,
      dob: req.body.dob,
      password: req.body.password,
      gender: req.body.gender,
      bio: req.body.bio
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
