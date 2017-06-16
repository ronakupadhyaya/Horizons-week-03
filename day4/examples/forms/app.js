"use strict";

var express = require('express');
var app = express();
var path = require('path');
var validator = require('validator');

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
  // console.log('hi');
  req.check('dob1', 'must be a real birthday').isBefore();
  req.check('mname1', 'initial is one word').isLength({max:1});
  req.check('password1', 'Gotta be the same password').equals(req.body.rpassword1);
  var error = req.validationErrors();
  var data = {
    firstname: req.body.fname1,
    middlename: req.body.mname1,
    lastname: req.body.lname1,
    dob: req.body.dob1,
    password: req.body.password1,
    rpassword: req.body.rpassword1,
    gender: req.body.optradio,
    newsletter: req.body.check,
    biography: req.body.bio,
    errors: error
  };
  console.log('errors are', error);
  if (error) {
    res.render('register', data);
  }
  else {
    res.render('profile', data);
  }

  // var errors; // YOUR CODE HERE - Get errors from express-validator here
  // if (errors) {
  //   res.render('register', {errors: errors});
  // } else {
  //   // Include the data of the profile to be rendered with this template
  //   // YOUR CODE HERE
  //   res.render('profile');
  // }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
