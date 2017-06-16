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

// Customize the validator
app.use(expressValidator({
 customValidators: {
    inPast: function(date) {
      return (date === '') || ((Date.parse(date) < Date.now()) ? true : false)
    },
    matchStr: function(current,origin){
      return (current===origin) ? true: false
    },
    isGender: function(data,content){
      return (data==="Male") || (data==="Female") || (data==="Rather not say")
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
  res.render('register',{errors:[]});
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
  req.check('firstName',"First name must not be empty!").notEmpty();
  req.check('middleInit',"Middle initial must be a single letter!").isLength({max:1});
  req.check('lastName',"Last name must not be empty!").notEmpty();
  req.check('date',"Date of birth must be in the past!").inPast();
  req.check('password',"Password must not be empty!").notEmpty();
  req.check('password2',"Repeat password must match password!").matchStr(req.body.password);
  req.check('gender',"Gender must be valid!").isGender();
  req.check('newsletter',"Must sign up for newsletter!").notEmpty();
  var errors = req.validationErrors(); // YOUR CODE HERE - Get errors from express-validator here
  if (errors) {
    res.render('register', {errors: errors});
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    res.render('profile',{
      firstName: req.body.firstName,
      middleInit: req.body.middleInit,
      lastName: req.body.lastName,
      date: req.body.date,
      password: req.body.password,
      gender: req.body.gender,
      newsletter: (req.body.newsletter==='on')?"Yes":"No",
      bio: req.body.bio
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
