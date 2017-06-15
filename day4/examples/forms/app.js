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

app.use(expressValidator({
 customValidators: {
    isPastDate: function(date) {
        return date.valueOf()<Date.now();
    }

 }
}));

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
  console.log(req.body);
  req.checkBody('firstName', 'first name invalid').notEmpty();

  req.checkBody('initial','must be single letter').isLength({min:1, max:1});

  req.checkBody('lastName', 'last name invalid').notEmpty();
  req.checkBody('dob','must be date in the past').isPastDate();
  req.checkBody('password', 'must enter password').notEmpty();
  req.checkBody('repeatpassword', 'must match password').notEmpty().equals(req.body.password);
  req.checkBody('gender', 'must select gender').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.render('register', {errors: errors});
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    res.render('profile',{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      gender: req.body.gender,
      bio: req.body.bio,
      password: req.body.password



    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
