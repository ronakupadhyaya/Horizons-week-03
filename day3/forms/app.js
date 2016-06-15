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

// DATA
var registered = false;

var registrationData = {
  firstName: "",
  middleInitial: "",
  lastName: "",
  dob: {
    month: null,
    day: null,
    year: null,
  },
  password: "",
  passwordRepeat: "",
  gender: "",
  newsletter: false,
  bio: "",
  registerDate: null,
  error: ""
};

var isValidData = function() {
  return true;
};

// ROUTES
app.get('/', function(req, res){
  res.redirect('/register');
});

// GET /register
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res){
  // YOUR CODE HERE
  res.render('register');
});

// Write a function that
function isValid(data) {
  // YOUR CODE HERE
  return false;
}

// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  // YOUR CODE HERE
  res.render('register');
});

app.get('/profile', function(req, res){
  // Compile registration template
  res.send(registrationTemplate(registrationData));
});

app.listen(3000, function() {
  console.log("Exmaple app listening on port 3000!");
});
