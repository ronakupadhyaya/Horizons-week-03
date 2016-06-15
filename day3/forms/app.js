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
  var date = new Date();

  res.render('register', {
    date: date.toDateString()
  });
});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.

// document.getElementById('#regdate').value = new Date().toDateInputValue();
// $(document).ready( function() {
//     $('#regdate').val(new Date().toDateInputValue());
// });​

function validate(req) {
  req.checkBody('fname', 'First name required').notEmpty();
  req.checkBody('lname', 'Last name required').notEmpty();
  req.checkBody('password', 'Password required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('password', 'Password required').notEmpty();
  req.checkBody('lname', 'Last name required').notEmpty();
  req.checkBody('gender', 'Gender required').notEmpty();
  req.checkBody('newsletter', 'Newsletter sign-up required').notEmpty();
  req.checkBody('bio', 'Bio required').notEmpty();
  req.checkBody('regdate', 'Date required').notEmpty();

  if(req.body.minitial){
    req.checkBody('minitial', 'Middle Initial should be 1 letter long').isLength({min:1, max:1});
  };
  if(req.body.bMonth) {
    req.checkBody('bMonth', 'Invalid birthday month').isInt({min:1, max: 12});
  };
  if(req.body.bDay) {
    req.checkBody('bDay', 'Invalid birthday day').isInt({min: 1, max: 31});
  };
  if (req.body.bYear){
    req.checkBody('bYear', 'Invalid birthday year').isInt({min:0});
  };
  // req.checkBody()
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
    res.render('register', {
      errors: errors,
    date: date.toDateString()
  });
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    res.render('profile');
  }
});



app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
