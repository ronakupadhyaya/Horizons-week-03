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

app.get('/profile', function(req,res){
  var errors = req.validationErrors();
  var m=req.query.middleInitial;
  if(!m){
   m=null;
  }
  var c=req.query.newsletter;
  if(!c){
    c=false;
  }
  else{
    c=true;
  }
  res.render('profile',{
    firstName: req.query.firstName,
    middleInitial: m,
    lastName: req.query.lastName,
    password: req.query.password,
    birthday:[req.query.dobMonth, req.query.dobDay, req.query.dobYear],
    gender: req.query.gender,
    newlsetter: c
  });
})

// ---Part 1: GET /register---
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res) {
  // YOUR CODE HERE
  res.render('register', {
    errors: JSON.stringify(req.query),
    name: req.query.name,
    email: req.query.email,
    day: days,
    year: years
  });
});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('firstName', 'Fist name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Password is required').notEmpty();
  if(req.query.password !== req.query.password2){
    throw error
  }
  req.checkBody('dobMonth', 'Birthday is required').notEmpty();
  req.checkBody('dobDay', 'Birthday is required').notEmpty();
  req.checkBody('dobYear', 'Birthday is required').notEmpty();
}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
var days=[];
for(var i=1; i<32; i++){
  days.push(i)
}
var years=[];
for(var i=1910; i<2017; i++){
  years.push(i)
}
//console.log(days)
app.post('/register', function(req, res){
  validate(req);
  // Get errors from express-validator
  var errors = req.validationErrors();
  var m=res.query.middleInitial;
  if(!m){
   m=null;
  }
  var c=res.query.newsletter;
  if(!c){
    c=false;
  }
  else{
    c=true;
  }
  if (errors) {
    res.render('register', 
    {errors: errors}); ///rendering with errors bc validation
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    app.get('/profile', function(req,res){
    res.render('profile',{
    firstName: res.query.firstName,
    middleInitial: m,
    lastName: res.query.lastName,
    password: res.query.password,
    birthday:[res.query.dobMonth, res.query.dobDay, res.query.dobYear],
    gender: res.query.gender,
    newlsetter: c
    });
    })
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});