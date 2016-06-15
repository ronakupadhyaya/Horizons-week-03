"use strict";

var express = require('express');
var app = express();
var fs = require('fs');                                         //file system
var path = require('path');

// Set up handlebar templates                                   //live inside the views folder -> make sure we can call doc render
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Enable form validation with express validator.
var expressValidator = require('express-validator');            //
app.use(expressValidator());

// Enable POST request body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));            // for post requests to work properly
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));        //make sure the cs file in public folder is accessable

// ROUTES
app.get('/', function(req, res){                                // redirecting from the homepage to the registar page
  res.redirect('/register');
});

// ---Part 1: GET /register---
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res){                        // get method; url = /register  ; renders a template
  // YOUR CODE HERE
  // res.render('register', {errors:"Something here"});         //render takes a templates
  res.render('register',{
    // errors:JSON.stringify(req.query),
                                                                // name: req.query.name,    if this is a get -> query
                                                                // email: req.query.email
  })
});                                                             // pass data into render via objects,

// ---Part 2: Validation---
// Write a function that takes a request object and does      //"Confirm Form Resubmission" -> refresh a page that is a result of a post request
// validation on it using express-validator.




function validate(req) {
  req.checkBody('firstName', 'Invalid firstName').notEmpty();
  req.checkBody ('lastName', 'Invalid last name').notEmpty();
  req.checkBody ('middleI', 'Invalid Middle Initial').isLength({min:0, max:1});
  // req.checkBody ('dOB', 'Invalid integer').!isNaN();
  req.checkBody ('password', 'Invalid password').notEmpty();
  req.checkBody ('rPassword', 'Invalid password').notEmpty();
  req.checkBody ('rPassword', 'Invalid repeat password').equals(req.body.password);
  req.checkBody ('gender', 'Invalid last name').notEmpty();
  req.checkBody ('biography', 'Invalid Middle Initial').isLength({min:0});
  // req.checkBody ('signUp', 'Invalid last name').notEmpty();
}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){         // if there are errors then render again if not then render profile
  console.log(req.body);
  validate(req);
  // Get errors from express-validator
  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {errors: errors});       //rendering the same template for both
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    res.render('profile', {
      firstName: req.body.firstName,
      middleI: req.body.middleI,
      lastName: req.body.lastName,
      password: req.body.password,
      DOB: req.body.dOB,
      gender: req.body.gender,
      bib: req.body.biography,
      date: req.body.date
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});