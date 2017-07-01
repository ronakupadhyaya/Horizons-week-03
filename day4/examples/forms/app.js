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
    console.log(req.body.repeatPass, req.body.pass);
  req.check('firstName', 'First name field must not be empty').notEmpty()
  req.check('middleInitial', 'Middle initial field must be one letter').isLength(
      { min:0, max: 1}
  );
  req.check('lastName', 'Last name field must not be empty').notEmpty()
  req.check('dateOfBirth', 'Date of birth field must not be empty').isBefore()
  req.check('pass', 'Password field must not be empty').notEmpty()
  req.check('repeatPass', 'Passwords must match and must not be empty').notEmpty()
  req.check('repeatPass', 'Passwords must match and must not be empty').equals(`${req.body.repeatPass}`,`${req.body.pass}`)
  req.check('signUp', 'You must be signed up for the newsletter').notEmpty()

  var errors = req.validationErrors(); // YOUR CODE HERE - Get errors from express-validator here
  if (errors) {
      console.log(errors);
    res.render('register', {
        errors: errors,
        firstName: req.body.firstName,
        middleInitial: req.body.middleInitial,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        pass: req.body.pass,
        gender: req.body.gender,
        signUp: req.body.signUp,
        bio: req.body.bio
    });
  } else {
    res.render('profile', {
        firstName: req.body.firstName,
        middleInitial: req.body.middleInitial,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        pass: req.body.pass,
        gender: req.body.gender,
        signUp: req.body.signUp,
        bio: req.body.bio
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
