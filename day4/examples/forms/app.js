 "use strict";

var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


// Enable POST request body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable form validation with express validator.
var expressValidator = require('express-validator');
app.use(expressValidator());

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
  console.log("hi");
  req.check('firstName', 'error empty').notEmpty();
  req.check('middleInitial', 'error wrong length').isLength({min:1, max:1});
  req.check('lastName', 'error empty2').notEmpty();
  req.check('dateOfBirth', 'error not date').isBefore(new Date().toString());
  req.check('password', 'error empty3').notEmpty();
  req.check('repeatPassword', 'error wrong password repeat').equals(req.body.password);//TODO add a second method to do same as above
  req.check('gender', 'error empty4').notEmpty();

  var errors=req.validationErrors(); // YOUR CODE HERE - Get errors from express-validator here
  console.log(errors);
  if (errors) {
    res.render('register', {errors: errors});
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    var data={
      profile: req.body
    }
    res.render('profile', data);
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
