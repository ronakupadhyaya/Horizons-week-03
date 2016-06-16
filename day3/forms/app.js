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
app.get('/register', function(req, res) {
  // YOUR CODE HERE
  res.render('register', {
    name: req.query.name,
    email: req.query.email
  });
});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('fname', 'First name is required').notEmpty();
  req.checkBody('mIn', 'Middle initial must be one letter').isLength({min: 1, max: 1});
  req.checkBody('lname', 'Last name is required').notEmpty();
  req.checkBody('birthDay', 'Day of birth should be a valid day').isInt({min: 1, max: 31});
  req.checkBody('birthMonth', 'Month of birth should be a valid month').isInt({min: 1, max: 12});
  req.checkBody('birthYear', 'Year of birth should be a valid year').isInt({min: 1900, max: 2016});
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('repeatPassword', 'Password much match!').equals(req.body.repeatPassword);
}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  validate(req);
  // Get errors from express-validator
  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {errors: errors});
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    res.render('profile');
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
