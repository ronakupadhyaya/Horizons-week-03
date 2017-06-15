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

// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
//
// 1. Update register.hbs to display error messages in a readable way.
// 2. Pass in all the submitted user information (from req) when rendering profile.hbs
// 3. Update profile.hbs to display all the submitted user profile fields. This
//    profile should not be editable.
app.post('/register', function(req, res){
  // YOUR CODE HERE - Add express-validator validation rules here
  req.check('first-name', 'First name required').notEmpty();
  req.check('middle-initial', 'Must be single letter').isLength({min: 1, max: 1});
  req.check('last-name', 'Last name required').notEmpty();
  req.check('dob', 'Must be in the past').isBefore();
  req.check('password', 'Password required').notEmpty();
  req.check('repeat-password', 'Password not matching').equals(req.body.password);
  req.check('gender', 'Gender is required').notEmpty();
  req.check('newsletter', 'Newsletter is mandatory').notEmpty();

  // YOUR CODE HERE - Get errors from express-validator here
  var errors = req.validationErrors();
  console.log("YOUR ERRORS ARE", errors);

  if (errors) {
    res.render('register', {errors: errors});
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE


    res.render('profile', {
      first: req.body['first-name'],
      middle: req.body['middle-initial'],
      last: req.body['last-name'],
      dob: req.body.dob,
      password: req.body.password,
      gender: req.body.gender,
      bio: req.body.bio
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
