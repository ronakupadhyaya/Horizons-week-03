"use strict";

var express = require('express');
var app = express();
var fs = require('fs');
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
var mo = [1,2,3,4,5,6,7,8,9,10,11,12];
var day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
var year = [1997,1998,1999,2000,2001,2002];
// ---Part 1: GET /register---
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res){
  // YOUR CODE HERE
  res.render('register', {
    mo: mo,
    day: day,
    year: year
  });
});
// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it useing express-validator.
function validate(req) {
  req.checkBody('firstName', 'Invalid First Name').notEmpty();
  if(req.body.middleInitial) req.checkBody('middleInitial', 'Invalid middle initial').len(1,1);
  req.checkBody('lastName', 'Invalid Last Name').notEmpty();
  if(req.body.DOBmonth) req.checkBody('DOBmonth', 'Invalid Birth Month').notEmpty().len(1,2).isInt();
  if(req.body.DOBday) req.checkBody('DOBday', 'Invalid Birth Day').notEmpty().len(1,2).isInt();
  if(req.body.DOByear) req.checkBody('DOByear', 'Invalid Birth Year').notEmpty()
  req.checkBody('Pwd', 'Passwords don\'t match').len(req.body.repeatPwd.length, req.body.repeatPwd.length).contains(req.body.repeatPwd).notEmpty();
  req.checkBody('gender', 'Please select a gender').notEmpty();
  req.checkBody('bio', 'We know your name but not your story. Put some info in bio pls.').notEmpty();
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
    res.render('register', {errors: JSON.stringify(errors), mo: mo, day: day, year: year});
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    res.render('profile', {
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastName: req.body.lastName,
      DOBmonth: req.body.DOBmonth,
      DOBday: req.body.DOBday,
      DOByear: req.body.DOByear,
      gender: req.body.gender,
      newsLetter: req.body.newsLetter,
      bio: req.body.bio,
      registerDate: new Date().toDateString()
    });
  }
});

app.listen(3000, function() {
  console.log("Exmaple app listening on port 3000!");
});
