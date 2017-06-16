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
app.use(expressValidator({
  customValidators: {
    isPast: function(value) {
      var today = Date.now();
      var dob = Date.parse(value);
      return today > dob;
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
  req.checkBody('firstName', 'Please include a first name.').notEmpty();
  req.checkBody('midInit', 'Only one letter.').isLength({max: 1});
  req.checkBody('password', 'Password is too short!').isLength({min: 4});
  req.checkBody('lastName', 'Please include a last name.').notEmpty();
  req.checkBody('dob', 'Please include a date of birth.').notEmpty();
  req.checkBody('dob', 'Date not in past.').isPast();
  req.checkBody('gender', 'Please include a gender.').notEmpty();
  req.checkBody('newsletter', 'Please signup!').notEmpty();
  req.checkBody('password2','Passwords do not match.').equals(req.body.password)


  var errors = req.validationErrors(); // YOUR CODE HERE - Get errors from express-validator here
  if (errors) {
    res.render('register', {errors: errors});
  } else {
    // Include the data of the profile to be rendered with this template
    console.log(req.body.firstName);
    res.render('profile', {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      midInit: req.body.midInit,
      password: req.body.password,
      dob: req.body.dob,
      gender: req.body.gender,
      biography: req.body.biography,
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
