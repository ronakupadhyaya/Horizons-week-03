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


app.get('/register', function(req, res) {
  // YOUR CODE HERE
  //rendering the first time you arrive on the page
  var arr = ["DD"];
for(var i = 1; i < 32; i++) {
  arr.push(i);
}

  var year = ["YYYY"];
for (var i = 1900; i < 2016; i++) {
  year.push(i);
}
  res.render('register', {
    name: req.query.name,
    email: req.query.email,
    month: ["MM",1,2,3,4,5,6,7,8,9,10,11,12],
    day: arr,
    year: year
  });
});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('firstName', 'First name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('gender', 'Gender is required').notEmpty();
  req.checkBody('check', 'You must sign up for our newsletter!').notEmpty();
  req.checkBody('bio', 'A biography is required').notEmpty();
  req.assert('password2', 'Passwords do not match').equals(req.body.password1);

}


// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  validate(req);
  // Get errors from express-validator
  var errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    // doing some validation. if errors, rerender with errors
    res.render('register', {errors: errors});
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    res.render('profile',req.body);
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});