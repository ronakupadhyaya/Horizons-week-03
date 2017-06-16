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
  app.use(expressValidator({
 customValidators: {
    isPast: function(value) {
      var inputDate = new Date(value)
      var todaysDate = new Date();
      console.log(inputDate > todaysDate)
      return (inputDate.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0))
    }
 }
}));
  req.checkBody("fName", "Please Enter a first name").notEmpty();
  req.checkBody("lName", "Please Enter a last name").notEmpty();
  req.checkBody("mInitial", "Initials are just one letter").isLength({
    min:0, max: 1
  });
  req.checkBody("inputPassword3", "Please Enter a password").notEmpty();
  req.check("DOB", "Birthday must be a time in the past; literally you could be born yesterday for all I care").isBefore();
  req.checkBody("repPass", "Repeat your password").notEmpty();
  req.assert('repPass', 'Passwords must match').equals(req.body.inputPassword3);
  req.checkBody("chkBox", "You have to let us bother you (newsletter)").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {errors: errors});
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    res.render('profile', {fName: req.body.fName,
                          lName: req.body.lName,
                          mInitial: req.body.mInitial,
                          DdOB: req.body.DOB,
                          gender: req.body.gender,
                          bio: req.body.bio
                         });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
