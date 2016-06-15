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
  res.render('register',{
    errors: JSON.stringify(req.query),
    name: req.query.name,
    years: getYears()
  });

});

// ---Part 2: Validation---
// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('firstName', 'Invalid firstName').notEmpty();
  req.checkBody('lastName', 'Invalid lastName').notEmpty();
  req.checkBody('birthMonth','Invalid month').isInt();
  req.checkBody('birthDay','Invalid day').isInt();
  req.checkBody('birthYear','Invalid year').isInt();
  req.checkBody('password', 'Invalid password').notEmpty();
  req.checkBody('passwordConfirm', 'Must confirm password').notEmpty();


}

// ---Part 3: Render errors and profile---
// POST /register
// This is the endpoint that the user hits when they submit
// the registration form.
app.post('/register', function(req, res){
  validate(req);

  var errors = req.validationErrors();


  // Get errors from express-validator
  var gender = req.body.gender;
  if(gender == 'genderOther'){ gender = 'Declined to answer'}
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var month = parseFloat(req.body.birthMonth);
  var day = parseFloat(req.body.birthDay);
  var year = parseFloat(req.body.birthYear);
  var date = new Date(month,day,year);
  var now = new Date();
  var password = req.body.password;
  if(now.getTime()<date.getTime()){
    if(! errors){
      errors=[];
    }
    errors.push({
      msg: "DOB cannot be in future"
    });
  }

if(req.body.password !== req.body.passwordConfirm){
  if(! errors){
    errors=[];
  }
  errors.push({
    msg:  "Passwords don't match"
  })
}

var months = ['January','February','March','April','May','June','July','September','October','November','December'];


  
  if (errors) {
    res.render('register', {errors: errors, years:getYears()});
  } else {
    // YOUR CODE HERE
    // Include the data of the profile to be rendered with this template
    
    res.render('profile',{
      firstName: firstName,
      middleInitial: req.body.middleInitial,
      lastName: lastName,
      password: password,
      gender: gender,
      birthMonth: months[month-1],
      birthDay: day,
      birthYear:year

    });
  }
});


function getYears(){
  var years = [];
  for(var i=1899;i<=2016;i++){
    years.push(i);
  }
  return years;
}

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
