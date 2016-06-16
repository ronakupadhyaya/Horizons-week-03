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


function getMonths() {
  var returnArray = [];
  for (var i = 1; i < 13; i++) {
    returnArray.push(i);
  }
  return returnArray;
}

function getYears() {
  var returnArray = [];
  for (var i = 1910; i < 2020; i++) {
    returnArray.push(i);
  }
  return returnArray;
}

function getDays() {
  var returnArray = [];
  for (var i = 1; i < 32; i++) {
    returnArray.push(i);
  }
  return returnArray;
}



// ---Part 1: GET /register---
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res){
  res.render('register', {
    Months: getMonths(),
    Years: getYears(),
    Days: getDays()
  });
});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('firstName', 'Invalid firstName').notEmpty();
  req.checkBody('lastName', 'Invalid lastName').notEmpty();
  req.checkBody('password', 'Invalid password').notEmpty();
  req.checkBody('repeat', 'Invalid matched password').notEmpty();
}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  validate(req);
  
  var errors = req.validationErrors();

  if (req.body.password !== req.body.repeat) {
    if (!errors) {
      errors = [];
    }
    errors.push({
      msg: "Passwords don't match"
    })
  }
  if (errors) {

    res.render('register', {
      Months: getMonths(),
      Years: getYears(),
      Days: getDays(),
      errors: errors
    });
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    res.render('profile', {
      registerDate: new Date().toDateString(),
      firstName: req.body.firstName,
      middleI: req.body.middleI,
      lastName: req.body.lastName,
      DOBMonth: req.body.DOBMonth, // didn't work
      DOBDay: req.body.DOBDay, // didn't work
      DOBYear: req.body.DOBYear, // didn't work
      password: req.body.password,
      gender: req.body.optionsRadios, //didn't work
      newsletter: req.body.checkbox,
      biography: req.body.biography
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
