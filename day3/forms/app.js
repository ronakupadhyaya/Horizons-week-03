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

// ---Part 1: GET /register---
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
var mo=[1,2,3,4,5,6,7,8,9,10,11,12];
var day=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
var year=[1994,1995,1996,1997,1998];
app.get('/register', function(req, res){
  // YOUR CODE HERE
  res.render('register',{
	  mo:mo, 
	  day: day, 
	  year: year
	});
});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('firstName', 'Invalid firstName').notEmpty();
  req.checkBody('lastName', 'Invalid lastName').notEmpty();
  if(req.body.middleInitial) req.checkBody('middleInitial', 'Invalid initial').len(1,1);
  if(req.body.DOBMonth) req.checkBody('DOBMonth', 'Invalid month').len(1,2).isInt();
  if(req.body.DOBYear) req.checkBody('DOBYear', 'Invalid year').len(4,4).isInt();
  if(req.body.DOBDay) req.checkBody('DOBDay', 'Invalid day').len(1,2).isInt();
  req.checkBody('passWord', 'Password mismatch').len(req.body.repeatPassword.length, req.body.repeatPassword.length).contains(req.body.repeatPassword).notEmpty();
  req.checkBody('gender', 'Check a gender').notEmpty();
  req.checkBody('bio','Tell us more').notEmpty();


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
    res.render('register', {errors: errors, mo:mo, day:day, year:year});
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    res.render('profile', {
    	firstName:req.body.firstName, 
    	middleInitial:req.body.middleInitial, 
    	lastName:req.body.lastName, 
    	DOBMonth:req.body.DOBMonth, 
    	DOBDay:req.body.DOBDay, 
    	DOBYear:req.body.DOBYear,
    	gender:req.body.gender,
    	newsletter:req.body.newsletter,
    	bio:req.body.bio,
    	registration:new Date().toDateString()
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
