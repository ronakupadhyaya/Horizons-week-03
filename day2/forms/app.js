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

// GET /register route
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res){
  res.render('register');
});

// ---Exercise 1: Validation---
// Write a function that takes a request object and does validation on it using
// express-validator.
// We've provided an example validation rule that validates the firstName
// field.
// Read the express-validator docs to see how to do other validations:
// https://github.com/ctavan/express-validator
function validate(req) {
  console.log(req);
  req.checkBody('firstName', 'Invalid firstName').notEmpty();
  req.checkBody('lastName', 'Invalid lastName').notEmpty();
  req.checkBody('bio', 'Invalid bio').notEmpty();
  req.checkBody('middleInitial', 'Invalid middleInitial').isSingle(req.body.middleInitial);
  req.checkBody('newsletter', 'Invalid signup').notEmpty();
  req.checkBody('password', 'Invalid password').notEmpty();
  req.checkBody('repeatPassword', 'Invalid password2').notEmpty().equals(req.body.password);
}

<<<<<<< HEAD
app.use(expressValidator({
 customValidators: {
    isSingle: function(letter) {
        return (letter.length === 1)
    },
 }
}));

// ---Part 3: Render errors and profile---
=======
// ---Exercise 2: Render errors and profile---
>>>>>>> master
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
//
// 1. Update register.hbs to display error messages in a readable way.
// 2. Pass in all the submitted user information (from req) when rendering profile.hbs
// 3. Update profile.hbs to display all the submitted user profile fields. This
//    profile should not be editable.
app.post('/register', function(req, res){
  validate(req);
  // Get errors from express-validator
  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {errors: errors});
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    req.body.date = new Date();
    res.render('profile', req.body);
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
