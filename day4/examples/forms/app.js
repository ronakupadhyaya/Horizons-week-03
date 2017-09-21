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
  req.check('firstName',"Please provide a value for 'first name.'").notEmpty();
  req.check('middleInitial',"Value for 'middle initial' must be one letter.").isLength({max:4});
  req.check('lastName',"Please provide a value for 'last name.'").notEmpty();
  req.check('DOB',"Please provide a valid date in the past.").isBefore(Date());
  req.check('password',"Please provide a value for 'password.'").notEmpty();
  req.check('repeatPassword',"Please provide a value for 'repeat password.'").notEmpty();
  req.check('repeatPassword',"Values for 'password' and 'repeat password' do not match.").equals(req.body.password,req.body.repeatPassword);
  req.check('gender',"Please provide a value for 'gender.'").notEmpty();
  req.check('newsletter',"Please indicate whether you wish to receive a newsletter.").notEmpty();
  var errors = req.validationErrors(); // Get errors from express-validator here
  if (errors) {
    res.status(400);
    res.render('register', {
      errors: errors,
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastName: req.body.lastName,
      DOB: req.body.DOB,
      password: req.body.password,
      repeatPassword: req.body.repeatPassword,
      isMale: req.body.gender==='male',
      isFemale: req.body.gender==='female',
      isUnspecified: req.body.gender==='unspecified',
      newsletter: req.body.newsletter,
      bio: req.body.bio
    });
  } else {
    // Include the data of the profile to be rendered with this template
    res.render('profile',{
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastName: req.body.lastName,
      DOB: req.body.DOB,
      password: req.body.password,
      repeatPassword: req.body.repeatPassword,
      gender: req.body.gender,
      newsletter: req.body.newsletter,
      bio: req.body.bio
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
