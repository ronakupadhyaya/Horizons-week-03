"use strict";

var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Enable form validation with express validator.
var expressValidator = require('express-validator');
app.use(expressValidator( {
  customValidators: {
    passesAreEqual: function(pass, rpass) {
      return pass === rpass;
    },
    oneIsChecked: function(m, f, pn) {
      return m || f || pn;
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
function getYears() {
  var ret = []
  for (var i = 1899; i <= new Date().getFullYear(); i++) {
    ret.push(i);
  }
  return ret;
}
function getDaysOfMonth() {
  var ret = [];
  for (var i = 1; i < 32; i++) {
    ret.push(i);
  }
  return ret;
}
function getMonths() {
  var ret = [];
  for (var i = 1; i < 13; i++) {
    ret.push(i);
  }
  return ret;
}
app.get('/register', function(req, res) {
  // YOUR CODE HERE
  res.render('register', {
      daysOfMonth: getDaysOfMonth(),
      years: getYears(),
      month: getMonths()
  });
});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('firstName', 'Fist name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('passwordRepeat', 'Password is required').notEmpty();
  req.checkBody('bio', 'Biography is required').notEmpty();
  req.checkBody('day', 'DOB day must be a number').isInt();
  req.checkBody('month', 'DOB month must be a number').isInt();
  req.checkBody('year', 'DOB year must be a number').isInt();
  req.checkBody('passwordRepeat', 'Incorrect Password').passesAreEqual(req.body.password);
  req.checkBody('male', 'Must choose gender').oneIsChecked(!!req.body.female, !!req.body.prefNot);
}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  validate(req);
  // Get errors from express-validator
  var errors = req.validationErrors();
  var month = parseInt(req.body.month);
  var day = parseInt(req.body.day);
  var year = parseInt(req.body.year);
  var date = new Date(year, month - 1, day);
  var now = new Date();
  if (now.getTime() < date.getTime()) {
    if(! errors) {
      errors = [];
    }
    errors.push({msg:'DOB cannot be in future'});
    
  }
  if (errors) {
    res.render('register', {
      errors: errors,
      daysOfMonth: getDaysOfMonth(),
      years: getYears(),
      month: getMonths()

    });
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    
    var prof = req.body;
    if (prof.male) {
      prof.gender = "Male";
    } else if (prof.female) {
      prof.gender = "Female"
    } else {
      prof.gender = "Not specified"
    }
    res.render('profile', prof);

  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});


