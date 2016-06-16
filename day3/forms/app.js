// "use strict";

// var express = require('express');
// var app = express();
// var fs = require('fs');
// var path = require('path');

// // Set up handlebar templates
// var exphbs = require('express-handlebars');
// app.set('views', path.join(__dirname, 'views'));
// app.engine('.hbs', exphbs({extname: '.hbs'}));
// app.set('view engine', '.hbs');

// // Enable form validation with express validator.
// var expressValidator = require('express-validator');
// app.use(expressValidator());

// // Enable POST request body parsing
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// // ROUTES
// app.get('/', function(req, res){
//   res.redirect('/register');
// });

// // ---Part 1: GET /register---
// // This is the endpoint that the user loads to register.
// // It contains an HTML form that should be posted back to
// // the server.
// app.get('/register', function(req, res){
//   // YOUR CODE HERE
//   res.render('register');
// });

// // ---Part 2: Validation---
// // Write a function that takes a request object and does
// // validation on it using express-validator.
// function validate(req) {
//   req.checkBody('firstName', 'Invalid firstName').notEmpty();
// }

// // ---Part 3: Render errors and profile---
// // POST /register
// // This is the endpoint that the user hits when they submit
// // the registration form.
// app.post('/register', function(req, res){
//   validate(req);
//   // Get errors from express-validator
//   var errors = req.validationErrors();
//   if (errors) {
//     res.render('register', {errors: errors});
//   } else {
//     // YOUR CODE HERE
//     // Include the data of the profile to be rendered with this template
//     res.render('profile');
//   }
// });

// app.listen(3000, function() {
//   console.log("Example app listening on port 3000!");
// });

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

function getYears() {
  var ret = [];
  for (var i=1899; i<= new Date().getFullYear();  i++) {
    ret.push(i);
  }
  return ret;
}
function getDaysOfMonth() {
  var ret = [];
  for (var i=1; i<32; i++) {
    ret.push(i);
  }
  return ret;
}
// ---Part 1: GET /register---
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res) {
  // YOUR CODE HERE
  res.render('register', {
    daysOfMonth: getDaysOfMonth(),
    years: getYears()
  });
})

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('firstName', 'Fist name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('dobDay', 'DOB day must be a number').isInt();
  req.checkBody('dobMonth', 'DOB month must be a number').isInt();
  req.checkBody('dobYear', 'DOB year must be a number').isInt();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Password is required').notEmpty();
  req.checkBody('Bio', 'Biography is required').notEmpty();
  req.checkBody('gender', 'Gender is required').notEmpty();
}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  validate(req);
  // Get errors from express-validator
  var errors = req.validationErrors();
  var month = parseInt(req.body.dobMonth);
  var year = parseInt(req.body.dobYear);
  var day = parseInt(req.body.dobDay);
  var date = new Date(year, month-1, day);
  var now = new Date();
  // var errors = [];
  if(now.getTime() < date.getTime()) {
    console.log('Person is born in the future');
    if (!errors) {
      errors = [];
    }
    errors.push({
      msg: "DOB cannot be in future"
    });
  }

  if (req.body.password !== req.body.password2) {
    if (! errors) {
      errors = [];
    }
    errors.push({
      msg: "Passwords don't match"
    })
  }
  if (errors) {
    res.render('register', {
      daysOfMonth: getDaysOfMonth(),
      errors: errors,
      years: getYears()
    });
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    res.render('profile', {
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastName: req.body.lastName,
      dobMonth: req.body.dobMonth,
      dobDay: req.body.dobDay,
      dobYear: req.body.dobYear,
      gender: req.body.gender,
      Bio: req.body.Bio,
      registered: new Date().toDateString()
     });
  };
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});