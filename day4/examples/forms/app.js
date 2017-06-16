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
  req.checkBody('firstName', 'You need to enter your first name').notEmpty();
  req.checkBody('lastName', 'You need to enter your last name').notEmpty();
  req.checkBody('password', 'You need to enter a password').notEmpty();
  req.checkBody('doB', 'Must be a date in the past').isInPast(req.body.doB);
  req.checkBody('passwordConf', 'Make sure you confirm the same password!').notEmpty().isEqual(req.body.password, req.body.passwordConf);
  req.checkBody('gender', 'Please specify your gender').notEmpty();
  req.checkBody('newsletter', 'Sign up for the newsletter').notEmpty();
  var gender = req.body.gender;
  console.log(gender)

  var profile = {
    firstName: req.body.firstName,
    middleInitial: req.body.middleInitial,
    lastName: req.body.lastName,
    doB: req.body.doB,
    password: req.body.password,
    gender: gender,
    newsletter: req.body.newsletter,
    bio: req.body.bio
  }

  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {errors: errors, profile: profile});
  } else {
    // Include the data of the profile to be rendered with this template
    res.render('profile', profile);
  }
});

app.use(expressValidator({
 customValidators: {
    isEqual: function(value1, value2) {
        return value1===value2;
    },
    isInPast: function(date){
      return date.valueOf() < Date.now();
    }
 }
}));

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
