"use strict";

var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Enable form validation with express validator.
var expressValidator = require('express-validator');
app.use(expressValidator());

// Enable POST request body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/', function(req, res) {
  res.redirect('/register');
});

// GET /register route
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res) {
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
app.post('/register', function(req, res) {
  // YOUR CODE HERE - Add express-validator validation rules here
  req.checkBody('firstName', 'First Name Must not be empty').notEmpty();
  req.checkBody('middleName', 'More than one letter').isLength({
    max: 1
  });
  req.checkBody('lastName', 'last name must not be empty').notEmpty();
  req.checkBody('dob', 'dob Must be a date in the past').isBefore();
  req.checkBody('password', 'password  must not be empty').notEmpty();
  req.checkBody('repeatPassword', 'repeatpasswoed must not be empty and matche each other').notEmpty().matches(req.body.repeatPassword);
  req.checkBody('check', 'Must sign up').notEmpty();
  var errors = req.validationErrors(); // YOUR CODE HERE - Get errors from express-validator here
  if (errors) {
    res.render('register', {
      errors: errors,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      password: req.body.password,
      repeat: req.body.repeatPassword,
      options: req.body.option,
      bio: req.body.bio,
      check: req.body.check
    });
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    res.render('profile', {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      password: req.body.password,
      repeat: req.body.repeatPassword,
      options: req.body.option,
      bio: req.body.bio,
      check: req.body.check

    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
