"use strict";

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Enable form validation with express validator.
var expressValidator = require('express-validator');
app.use(expressValidator({
  customValidators: {
    strictlyEquals: function(value, otherValue) {
      return value === otherValue;
    },
    validMonth: function(value) {
      return (1<=value && 12>=value);
    },
    validDay: function(value) {
      return (1<=value && 31>=value);
    },
    validYear: function(value) {
      return (value >= 0);
    },
    singleCharacter: function(value) {
      return (value.length === 1);
    },
    validGender: function(value) {
      if(value === 'male' || value === 'female' || value === 'rather not say') {
        return true;
      } else {
        return false;
      }
    }
  }
}));

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

// ---Part 1: GET /register---
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res){
  // YOUR CODE HERE
  var data = {
    month: _.range(1,13),
    day: _.range(1,32),
    year: _.range(1900,2017)
  };
  res.render('register', data);
});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('first-name', 'First name is missing').notEmpty();
  req.checkBody('middle-initial', 'Middle initial is not a single character').singleCharacter();
  req.checkBody('last-name', 'Last name is missing').notEmpty();
  req.checkBody('dbo-month', 'DBO-month is missing').notEmpty().validMonth();
  req.checkBody('dbo-day', 'DBO-day is missing').notEmpty().validDay();
  req.checkBody('dbo-year', 'DBO-year is missing').notEmpty().validYear();
  req.checkBody('password', 'Password is missing').notEmpty();
  req.checkBody('password-repeat', 'Password-repeat is missing').notEmpty();
  req.checkBody('password-repeat', 'Passwords does not match').strictlyEquals(req.body.password)
  req.checkBody('gender', 'Gender is missing').notEmpty();
  req.checkBody('gender', 'Gender is not valid').validGender();
  req.checkBody('newsletter', 'Newsletter is missing').notEmpty();
  req.checkBody('bio', 'Bio is missing').notEmpty();
  req.checkBody('registration-date', 'Registration date is missing').notEmpty();
}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  console.log(req.body);
  validate(req);
  // Get errors from express-validator
  var errors = req.validationErrors();
  if (errors) {
    var data = {
      param: req.body,
      errors: errors,
      month: _.range(1,13),
      day: _.range(1,32),
      year: _.range(1900,2017)
    };
    res.render('register', data);
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    req.body['registration-date'] = new Date();
    data = {
      param: req.body
    },
    res.render('profile', data);
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
