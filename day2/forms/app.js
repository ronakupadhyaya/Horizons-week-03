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
app.get('/register', function(req, res){
  // YOUR CODE HERE
  res.render('register');

});

app.use(expressValidator({
 customValidators: {
    lte: function(param, num) {
        return param <= num;
    },
    gte: function(param, num) {
        return param >= num;
    },
    equal: function(param, num){
      return param == num;
    }
 }
}));

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('firstname', 'Invalid firstName').notEmpty();
  req.checkBody('middlename', 'Invalid Middlename').notEmpty().lte(1);
  req.checkBody('lastname', 'Invalid lastName').notEmpty();
  req.checkBody('month', 'Invalid month').isInt();
  req.checkBody('day', 'Invalid day').isInt();
  req.checkBody('year', 'Invalid year').isInt();
  req.checkBody('passwo', 'Invalid Password').notEmpty().equal(req.passwo1);
  req.checkBody('passwo1', 'Password not the same').notEmpty().equal(req.passwo);
  req.checkBody('gender', 'Invalid password').notEmpty();
  req.checkBody('news', 'Must not be blank').notEmpty();
  req.checkBody('bio', 'Invalid Bio').notEmpty();
}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  validate(req);
  console.log("this should not be undefined");
  console.log(req.body);
  // Get errors from express-validator
  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {errors: errors});
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    res.render('profile');
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
