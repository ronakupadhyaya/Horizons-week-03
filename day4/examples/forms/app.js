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
app.use(expressValidator({
  customValidators: {
    matches: function(value1, value2) {
      return value1===value2;
    },
    isPast: function(date) {
        return (new Date(date)).getTime() < Date.now();
    },
 }
}));

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
app.post('/register', function(req, res){
  // YOUR CODE HERE - Add express-validator validation rules here
  req.check("first", "first name must be present").notEmpty();
  // req.check("middle", "middle can only be 1 letter long").isLength({max: 1});
  // req.check("last", "last name must be present").notEmpty();
  // req.check("dob", "must be date in past").isPast();
  req.check("password", "must not be empty").notEmpty();
  if (req.body.password) {
    req.check("repeat_password", "must not be empty and match previous").matches(req.body.password);
  }
  console.log(req.body.gender);
  req.check()
  req.check()
  req.check()
  req.check()
  req.check()
  req.check()

  var errors = req.validationErrors(); // YOUR CODE HERE - Get errors from express-validator here
  console.log(errors);
  if (errors) {
    res.render('register', {errors: errors});
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    res.render('profile');
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
