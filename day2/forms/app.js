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
app.get('/register', function(request, response){
  response.render('register');
});

app.use(expressValidator({
 customValidators: {
    gte: function(param, num) {
        return param >= num;
    },
    isOneLetter: function(param){

      return param.length === 1;

    },
    isBetween: function(param, first, last){

      if(param <= last && param >= first) return true;

      return false;
    },
    equalTo: function(param1, param2){
      return param1 === param2;
    }

 }
}));


// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('firstName', 'Invalid firstName').notEmpty();
  req.checkBody('middleName', 'Invalid Middle Name').notEmpty().isOneLetter();
  req.checkBody('lastName', 'Invalid Last Name').notEmpty();
  req.checkBody('month', 'Month must be between 1 and 12').isBetween(1, 12);
  req.checkBody('day', 'Day must be between 1 and 32').isBetween(1, 31);
  req.checkBody('year', 'Year must be nonnegative.');
  req.checkBody('password', 'Password field must not be empty').notEmpty();
  req.checkBody('repeatPassword', 'Passwords must match').notEmpty().equalTo(req.body.password);
  req.checkBody('biography', 'Biography field must not be empty').notEmpty();

}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  validate(req);
  console.log(req.body);
  // Get errors from express-validator
  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {errors: errors});
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    res.render('profile', req.body);
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
