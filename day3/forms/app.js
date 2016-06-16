"use strict";

var express = require('express'); // Incantation to import express app
var app = express(); //Create the express application
var fs = require('fs'); //Filesystem import
var path = require('path'); //Path import

// Set up handlebar templates
//exphbs imports express-handlebars so we can render
var exphbs = require('express-handlebars'); 
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Enable form validation with express validator.
// Validates the form
var expressValidator = require('express-validator');
app.use(expressValidator());

// Enable POST request body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Above this is boilerplate - this stuff is repeated all the time in most express web applications. 
// Don't worry too much about understanding boilerplate. 
// 'There's a whole world inside each line. It will come.'

// ROUTES
// Redirects someone to the register page if the path is empty. 
app.get('/', function(req, res){
  res.redirect('/register');
});

// ---Part 1: GET /register---
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.

//Works on the /register url
//What does each line do?
//Render renders the register template (register.hbs)
//Register.hbs gets turned into html and gets rendered. 
app.get('/register', function(req, res){
  // YOUR CODE HERE
  res.render('register')
});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
// Can just keep adding these
function validate(req) {
  req.checkBody('firstName', 'Invalid first name').notEmpty();
  req.checkBody('middleI', 'Invalid middle initial').isLength({min: 0, max: 1})
  req.checkBody('lastName', 'Invalid last name').notEmpty(); 

  req.checkBody('dobMonth', 'Invalid DOB Month').isInt({min: 1, max:12})
  req.checkBody('dobDay', 'Invalid DOB Day').isInt({min: 1, max:31})
  req.checkBody('dobYear', 'Invalid last name').isInt({min: 0, max: 2016})

  req.checkBody('password', 'Enter password').notEmpty();
  req.checkBody('repeatPassword', 'Repeat password').notEmpty();
  req.assert('repeatPassword', 'Repeat password').equals(req.body.password)

  req.checkBody('gender', 'Input gender').notEmpty();
  req.checkBody('newsletter', "Sign up for Newsletter ").notEmpty();
  req.checkBody('bio', "Sign up for Newsletter ").notEmpty();
}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  validate(req);
  // Get errors from express-validator
  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {errors: errors}); // if errors exist render the page with errors
  } else {
    // Include the data of the profile to be rendered with this template
    res.render('profile', {
      firstName: req.body.firstName,
      middleI: req.body.middleI, 
      lastName: req.body.lastName, 
      dobMonth: req.body.dobMonth, 
      dobDay: req.body.dobDay, 
      dobYear: req.body.dobYear, 
      gender: req.body.gender, 
      bio: req.body.bio
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

//How to put in the hidden? 
//Align CSS
//Prettify profile
