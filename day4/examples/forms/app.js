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

app.use(expressValidator({
  customValidators: {
    passEqual: function(pass, prevPass) {
      if (prevPass !== pass) {
        return false
      }
      else {
        return true
      }
    }
  }
}))

app.post('/register', function(req, res){
  // YOUR CODE HERE - Add express-validator validation rules here

  req.check('firstName', 'Required Field').notEmpty();
  req.check('middleInitial', 'Must be one letter').isLength({
    max: 1
  });
  req.check('lastName', 'Required Field').notEmpty();
  if (req.body.dateOfBirth) {
    req.check('dateOfBirth', 'Please select a date in the past').optional().isBefore();
  }
  req.check('password', 'Required Field').notEmpty();
  req.check('repeatPassword', 'Your passwords do not match').notEmpty().passEqual(req.body.password, req.body.repeatPassword);


  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {errors: errors});
  }
  else {
    res.render('profile', {
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastName: req.body.lastName,
      dateOfBirth: req.body.lastName,
      password: req.body.password,
      gender: req.body.gender,
      signUpForNewsletter: req.body.signUpForNewsletter,
      bio: req.body.bio
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
