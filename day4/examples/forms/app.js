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
app.post('/register', function(req, res){

  req.check('fname', 'Please input first name').notEmpty();
  req.check('mname', 'Only initial needed').optional().isLength({min:0, max: 1,});
  req.check('lname', 'Please input last name').notEmpty();
  req.check('dofbirth', "Invalid Birthday").notEmpty();
  req.check('password', "Please input password").notEmpty();
  req.check('reppassword', "Please input same password").notEmpty().contains(req.body.password);
  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {errors: errors});
  } else {
    var newsletter = 'nope'
    console.log(req.body.newsletter);
    if (req.body.newsletter){
      newsletter = 'yeee buddy'
    }
    var name = req.body.fname + " " + req.body.mname + " " + req.body.lname;
    res.render('profile',{
        name: name,
        bday: req.body.dofbirth,
        gender: req.body.gender,
        newsletter: newsletter,
        bio: req.body.bio,

    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
