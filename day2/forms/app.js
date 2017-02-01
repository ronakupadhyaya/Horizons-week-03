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
    singleCharacter: function(value) {return value.length === 1},
    inRange: function(value, lowbound, highbound) {return value >= lowbound && value <= highbound},
    greaterThan: function(value, lowbound) {return value >= lowbound},
    isEqual: function(value, secondval) {return value === secondval},
    oneOf: function(value, arr) {return arr.includes(value)}
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
  res.render('register', {
    header: "here it is",
    days: _.range(1,32),
    months: _.range(1,13),
    currentDate: new Date()
});
});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  console.log(req)
  req.checkBody('firstName', 'Invalid first name').notEmpty();
  if (req.body.middleInitial) req.checkBody('middleInitial', 'Middle initial must be one letter').singleCharacter();
  req.checkBody('lastName', 'Invalid last name').notEmpty();
  if (req.body.dobMonth) req.checkBody('dobMonth', 'Invalid birth month').isInt().inRange(1,12);
  if (req.body.dobDay)   req.checkBody('dobDay', 'Invalid birth day').isInt().inRange(1,31);
  if (req.body.dobYear)  req.checkBody('dobYear', 'Invalid birth year').isInt().greaterThan(1900);
  req.checkBody('password', 'Invalid password').notEmpty().isEqual(req.body.repeatPassword);
  req.checkBody('genderRadios', 'Invalid gender').notEmpty().oneOf(['male', 'female', 'helicopter']);
  req.checkBody('subCheckbox', 'Our newsletter is really good! Sign up!').notEmpty();
  req.checkBody('bio', 'Invalid bio').notEmpty();
}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  validate(req);
  // Get errors from express-validator
  var errors = req.validationErrors();
  console.log(errors)
  if (errors) {
    res.render('register', {
      errors: errors,
      header: "here it is",
      days: _.range(1,32),
      months: _.range(1,13),
      currentDate: new Date()
  }

  );
  } else {
    // YOUR CODE HERE

    // Include the data of the profile to be rendered with this template
    res.render('profile');
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
