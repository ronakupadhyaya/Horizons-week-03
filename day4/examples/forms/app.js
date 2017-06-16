"use strict";

var express = require('express');
var app = express();
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

// GET /register route
// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res){
  res.render('register');
});

// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
//
// 1. Update register.hbs to display error messages in a readable way.
// 2. Pass in all the submitted user information (from req) when rendering profile.hbs
// 3. Update profile.hbs to display all the submitted user profile fields. This
//    profile should not be editable.

app.use(expressValidator({
 customValidators: {
    isArray: function(value) {
        return Array.isArray(value);
    },
    gte: function(param, num) {
        return param >= num;
    },
    isPast: function(date){
      return Date.parse(date) < Date.now();
    },
    isTrue: function(value){
      return value;
    },
    isGender: function(value){
      var arr = ['Male','Female','Rather not say'];
      if (arr.indexOf(value) > -1){return true};
      return false;
    },
    isEqual: function(value1, value2) {
      return value1 === value2
    }
 }
}));
app.post('/register', function(req, res){
  //console.log(req.body.gen);
  console.log(req.body.optradio);
  req.checkBody('firstName','You need a first name').notEmpty();
  req.checkBody('middle','Middle initial should only be 1 character').isLength({max:1});
  req.checkBody('lastName','You need a last name').notEmpty();
  req.checkBody('dob','Your date must be in the past!').notEmpty().isPast();
  req.checkBody('pwd','You need a password').notEmpty();
  req.checkBody('rpwd','Your password must match').notEmpty().isEqual(req.body.pwd);
  req.checkBody('optradio','You must select a gender').isGender();
  req.checkBody('check','You must sign up for the newsletter').isTrue();
  var errors = req.validationErrors(); // YOUR CODE HERE - Get errors from express-validator here
  if (errors) {
    console.log(errors);
    res.render('register', {errors: errors});
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    res.render('profile',{
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      middle:req.body.middle,
      date:req.body.date,
      gender:req.body.gender,
      bio:req.body.bio
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
