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
  req.checkBody('firstName', 'Invalid firstName').notEmpty();
  req.checkBody('lastName', 'Invalid firstName').notEmpty();
  req.checkBody('password2', 'Invalid firstName').notEmpty().equals(req.body.password);
  req.checkBody('gender', 'Invalid firstName').notEmpty();
  req.checkBody('biography', 'Invalid firstName').notEmpty();
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
    console.log("fuck me up");
    res.render('register', {errors: errors});
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    res.render('profile', {
      name: req.body.firstName + " " + req.body.lastName,
      gender: req.body.gender,
      bio: req.body.biography
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
