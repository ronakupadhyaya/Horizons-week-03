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

// MODELS
var mongoose = require('mongoose');
mongoose.connect("mongodb://helioha:a12312123@ds013414.mlab.com:13414/horizons");
var User = require('./models/user');

app.get('/', function(req, res) {
  res.redirect('/register');
});

// This is the endpoint that the user loads to register.
// It contains an HTML form that should be posted back to
// the server.
app.get('/register', function(req, res){
  // YOUR CODE HERE
  res.render('register');
});

// Write a function that takes a request object and does
// validation on it using express-validator.
function validate(req) {
  req.checkBody('firstName', 'Invalid firstName').notEmpty();
  req.checkBody('lastName', 'Invalid lastName').notEmpty();
  req.checkBody('dobMonth', 'Invalid dobMonth').notEmpty().isInt();
  req.checkBody('dobDay', 'Invalid dobDay').notEmpty().isInt();
  req.checkBody('dobYear', 'Invalid dobYear').notEmpty().isInt();
  req.checkBody('password', 'Invalid password').notEmpty();
  req.checkBody('passwordRepeat', 'Invalid password').notEmpty().equals(req.body.password);
  req.checkBody('gender', 'Invalid password').notEmpty();
}

// POST /register
// Create a user
// If the fields are all validated, the data should be saved to the database 
// using the user model and the page should redirect to the profile of the user 
// that was just created.
app.post('/register', function(req, res){
  validate(req);
  // Get errors from express-validator
  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {errors: errors});
  } else {
    // YOUR CODE HERE

    var newUser = new User({
                          firstName: req.body.firstName,
                          middleInitial: req.body.middleInitial,
                          lastName: req.body.lastName,
                          dobMonth: Number(req.body.dobMonth),
                          dobDay: Number(req.body.dobDay),
                          dobYear: Number(req.body.dobYear),
                          password: req.body.password,
                          gender: req.body.gender,
                          newsletter: req.body.newsletter,
                          bio: req.body.bio});

    newUser.save(function(err, data) {
        console.log('data._id: ' + data._id);
        res.redirect('/profile/'+data._id);
    });
  }
});

// GET /profile/:id
// Show a user
// This route should fetch the user wit the given ide from the database and 
// render the profile template with the user data.
app.get('/profile/:id', function(req, res) {
  // YOUR CODE HERE
  User.find({_id : req.params.id}, function(error, data) {
    res.render('profile', data[0]);
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
