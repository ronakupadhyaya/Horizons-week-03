"use strict";

var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Enable form validation with express validator.
var expressValidator = require('express-validator');
app.use(expressValidator());

// Enable POST request body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/', function(req, res) {
  res.redirect('/register');
});

// GET /register route
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res) {
  res.render('register', {
    helpers: {
      selected: function(gender) {
        if (gender === req.body.gender)
          return 'checked';
      },
      checked: function(box) {
        if (box === req.body.newsletter)
          return 'checked';
      }
    }
  });
});

// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
//
// 1. Update register.hbs to display error messages in a readable way.
// 2. Pass in all the submitted user information (from req) when rendering profile.hbs
// 3. Update profile.hbs to display all the submitted user profile fields. This
//    profile should not be editable.
app.post('/register', function(req, res) {
  var today = new Date()

  req.checkBody('firstName', 'Missing a First Name').notEmpty();
  req.checkBody('middleInitial', 'Middle Initial must only be one letter').optional().isLength({
    max: 1
  });
  req.checkBody('lastName', 'Missing a Last Name').notEmpty();
  req.checkBody('dateOfBirth', 'Date of Birth must be a date in the past').optional().isBefore(today.toString());
  req.checkBody('password', 'Missing a password').notEmpty();
  req.checkBody('passwordRepeat', 'Missing the repeat of your password').notEmpty();
  req.checkBody('passwordRepeat', 'Repeat of your password must match your password').equals(req.body.password);
  req.checkBody('gender', 'A gender must be selected').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      errors: errors,
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      password: req.body.password,
      passwordRepeat: req.body.passwordRepeat,
      bio: req.body.bio,
      helpers: {
        selected: function(gender) {
          if (gender === req.body.gender)
            return 'checked';
        },
        checked: function(box) {
          if (box === req.body.newsletter)
            return 'checked';
        }
      }
    });
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    res.render('profile', {
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      password: req.body.password,
      gender: req.body.gender,
      newsletter: req.body.newsletter,
      bio: req.body.bio
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});