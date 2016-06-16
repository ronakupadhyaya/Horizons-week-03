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

// ---Part 1: GET /register---
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res){
  // YOUR CODE HERE
  res.render('register');
});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('firstName', 'Invalid First Name').notEmpty();
  req.checkBody('lastName', 'Invalid Last Name').notEmpty();
  req.checkBody('password', 'Invalid password').notEmpty();
  req.checkBody('repeatPass', 'Invalid password').notEmpty();
  req.checkBody('radio', 'Invalid radio selection').notEmpty();
  req.checkBody('checkbox', 'Invalid checkbox selection').notEmpty();
  req.checkBody('biography', 'Invalid biography').notEmpty();
}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  validate(req);
  // Get errors from express-validator
  var errors = req.validationErrors();
  if (req.body.password !== req.body.repeatPass) {
    errors.push({msg: "Passwords do not match"});
  }
  if (errors) {
    res.render('register', {errors: errors});
  } else {
    // YOUR CODE HERE
    var firstName = req.body.firstName;
    var middleInit = req.body.middleInitial;
    var lastName = req.body.lastName;
    var gender = req.body.radio;
    var biography = req.body.biography;
    req.body.time = new Date();
    console.log(req.body);
    // Include the data of the profile to be rendered with this template
    res.render('profile', {
      firstName: firstName,
      middleInit: middleInit,
      lastName: lastName,
      gender: gender,
      biography: biography,
      date: req.body.time
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
