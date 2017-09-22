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
app.post('/register', function(req, res) {
  var today = new Date().toString();
  req.check('first', 'Must have first name').notEmpty();
  req.check('middle', 'Only 1 letter').isLength({
    min: 1,
    max: 1
  })
  req.check('last', 'Must have last name').notEmpty();
  req.check('bday', 'must be in past').isBefore(today);
  req.check('pw', 'length cant be zero').notEmpty();
  req.check('pw2', 'must match').matches(req.body.pw);
  var errors = req.validationErrors() // - Get errors from express-validator here
  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    res.render('profile', {
      first: req.body.first,
      middle: req.body.middle,
      last: req.body.last,
      bday: req.body.bday,
      pw: req.body.pw,
      gender: req.body.gender,
      newsletter: req.body.newsletter,
      bio: req.body.bio
    });
  }
});

app.get('/profile', function(req, res) {
  res.render('profile');
});
app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
