"use strict";

var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Enable POST request body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable form validation with express validator.
var expressValidator = require('express-validator');
app.use(expressValidator({
 customValidators: {
    isDate: function(val) {
    var d = new Date(val);
    return !isNaN(d.valueOf());
  },
    beforeToday: function(val) {
      var d = new Date(val);
      return (new Date()).getTime() - d.getTime() >= 0;
    }
 }
}));

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
 // YOUR CODE HERE - Get errors from express-validator here
  req.checkBody('firstName', 'Invalid first name').notEmpty();
  req.checkBody('middleInitial', 'Invalid middle initial').notEmpty();
  req.checkBody('lastName', 'Invalid last name').notEmpty();
  req.checkBody('dob', 'Invalid date').isDate();
  req.checkBody('password', 'Password should be at least 4 characters long').isLength({
    min:4
  });
  req.checkBody('repeatPassword', 'Repeat password should equal password').equals(req.body.repeatPassword, req.body.password);
  req.checkBody('optradio', 'Select radio button value').notEmpty();
  req.checkBody('bio', 'Invalid biography').notEmpty();
  req.checkBody('dob', 'Date of birth should be in the past').beforeToday();
  var errors = req.validationErrors();
  if (errors) {
    console.log("There are errors!")
    res.render('register', {errors: errors});
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    res.render('profile', {
      firstName: req.body.firstName,
      middleIntial: req.body.middleInitial,
      lastName: req.body.lastName,
      dob: req.body.dob,
      gender: req.body.optradio,
      signedUp: req.body.checkbox === "checked",
      bio: req.body.bio,
      password: req.body.password
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
