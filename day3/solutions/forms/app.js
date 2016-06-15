"use strict";

var express = require('express');
var app = express();
var hbl = require('handlebars');
// var validate = require('express-validation');
var fs = require('fs');

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

// TEMPLATES

// YOUR CODE HERE
var registrationTemplate = hbl.compile(fs.readFileSync('register.hbl').toString());
var profileTemplate;

// ROUTES

// YOUR CODE HERE
app.get('/register', function(req, res){
  // Compile registration template
  res.send(registrationTemplate(registrationData));
});

app.post('/register', function(req, res){
  // Complete
  console.log(req.body);
  if (isValidData(req.body)) {
    
    res.send('aight');
  } else {
    req.body.error = ""
  }
});

app.get('/profile', function(req, res){
  // Compile registration template
  res.send(registrationTemplate(registrationData));
});

app.listen(3000, function() {
  console.log("Exmaple app listening on port 3000!");
});
