"use strict";

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Enable form validation with express validator.
var expressValidator = require('express-validator');
app.use(expressValidator());

// Enable POST request body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/', function(req, res) {
  res.redirect('/register');
});

// ---Part 1: GET /register---
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res) {
  // YOUR CODE HERE
  res.render('register');
});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  var initial = {
    'mInitial': {
      isLength: {
        options: [{min: 0, max: 1}],
        errorMessage: "Invalid initial"
      }
    }
  };

  app.use(expressValidator({
    customValidators: {
      gte: function(param, num){
        return param>=num;
      },
      lte: function(param, num){
        return param<=num;
      },
      same: function(param, str){
        return param === str;
      }
    }
  }))

  req.checkBody('firstName', 'Invalid first name').notEmpty();
  req.checkBody(initial);
  req.checkBody('lastName', 'Invalid last name').notEmpty();
  req.checkBody('month', 'Invalid month').gte(1).lte(12);
  req.checkBody('day', 'Invalid day').gte(1).lte(31);
  req.checkBody('year', 'Invalid year').gte(0);
  req.checkBody('password', 'Invalid password').notEmpty();
  req.checkBody('password2', 'Invalid password2').notEmpty().same(req.body.password);
  // req.checkBody('optradio', 'Invalid gender').notEmpty();
  req.checkBody('newsletter', 'Invalid newsletter').notEmpty();
  req.checkBody('bio', 'Invalid bio').notEmpty();
  // req.checkBody('date', 'Invalid date').not.notEmpty();
  console.log(req.body.password);
}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res) {
  validate(req);
  console.log(req.body);
  // Get errors from express-validator
  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.render('register', {
      errors: errors
    });
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    req.body.date = new Date();
    res.render('profile', req.body);
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});