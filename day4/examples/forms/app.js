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

var validator = require('express-validator');
app.use(validator())
app.use(expressValidator({
 customValidators: {
    isEqual: function(v1, v2) {
      return v1 === v2;
    },
    isInPast: function(date) {
      var today = new Date();
      var thisYr = today.getFullYear();
      var year = date.substring(0, 4)
      return parseInt(year) < parseInt(thisYr);
    }
  }
}));

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
/* checkedMale: req.query.gender === "male",
    checkedFemale: req.query.gender === "female",
    checkedOther: req.query.gender === "other" */
app.get('/register', function(req, res){
  res.render('register', {
    errors: null
  });
});

// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
//
// 1. Update register.hbs to display error messages in a readable way.
// 2. Pass in all the submitted user information (from req) when rendering profile.hbs
// 3. Update profile.hbs to display all the submitted user profile fields. This
//    profile should not be editable.
/*First Name	Y	text	Must not be empty
Middle initial	N	text	Single letter
Last name	Y	text	Must not be empty
Date of Birth	N	date	Must be a date in the past
Password	Y	password	Must not be empty
Repeat Password	Y	password	Must not be empty and match the password field
Gender	Y	radio	Male/Female/Rather not say
Sign-up for newsletter	Y	checkbox	Must not be blank
Bio	N	textarea	*/
app.post('/register', function(req, res){
  //optional fields
  var showMI = false;
  var showDoB = false;
  var showBio = false;
  //validation checks
  req.check('firstName', 'not be empty').notEmpty();
  if (req.body.middleInitial) {
    req.check('middleInitial', 'be only one letter').isLength({
      max: 1
    });
    showMI = true;
  }
  req.check('lastName', 'not be empty').notEmpty();
  if (req.body.dOB) {
    req.check('dOB', 'be in the past').isInPast(req.body.dOB);
    showDoB = true;
  }
  req.check('password', 'create password').notEmpty();
  req.check('passCheck', 'match the password').notEmpty().isEqual(req.body.password, req.body.passCheck);
  req.check('news', 'be checked yes').notEmpty();
  if (req.body.bio) {
    showBio = true;
  }

  var errors = req.validationErrors();
  if (errors) {
    // res.send(errors);
    res.render('register', {
      errors: errors
    });
  } else {
    res.render('profile', {
      firstName: req.body.firstName,
      showMI: showMI,
      middleInitial: req.body.middleInitial,
      lastName: req.body.lastName,
      showDoB: showDoB,
      dOB: req.body.dOB,
      password: req.body.password,
      news: "yes",
      showBio: showBio,
      bio: req.body.bio,
      gender: req.body.gender
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
