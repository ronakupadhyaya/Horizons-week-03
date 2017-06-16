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
  var radio = [
    {
      name: "male",
      checked: false
    },
    {
      name: "female",
      checked: true
    },
    {
      name: "rather not tell",
      checked: false
    }
  ];
  var checkbox = [
    {
      name:'signup',
      selected:false
    },
    {
      name:'notsignup',
      selected:false
    }
  ];
  res.render('register', { radio: radio,checkbox:checkbox });
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
  app.use(expressValidator({
   customValidators: {
      isRepeat: function(password2,password) {
          return password2===password;
      },
      isSingle:function(middleName){
        return middleName.length===1;
      },
      isPast:function(dob){
        return new Date(dob) < Date.now();
      }
   }
  }));

  req.check('firstName','firstName is required').notEmpty();
  req.check('middleName','middleName is a single letter').isSingle();
  req.check('lastName','lastName is required').notEmpty();
  req.check('dob','date of birth must be in the past').isPast();

  req.check('password','password is required').notEmpty();
  req.check('password2','passwords must match').notEmpty().isRepeat(req.body.password);

  var errors=req.validationErrors(); // YOUR CODE HERE - Get errors from express-validator here
  if (errors) {
    var radio = [
      {
        name: "male",
        checked: false
      },
      {
        name: "female",
        checked: false
      },
      {
        name: "rather not tell",
        checked: false
      }
    ];
    var checkbox = [
      {
        name:'signup',
        selected:false
      },
      {
        name:'notsignup',
        selected:false
      }
    ]
    radio.forEach(function(i) {
      if (i.name === req.body.gender) {
        i.checked = true;
      }
    })

    checkbox.forEach(function(j){
      if (j.name===req.body.signup){
        j.selected=true;
      }
    })
    console.log(errors);
    res.render('register', {
      errors: errors,
      radio: radio,
      checkbox:checkbox,
      user:req.body
      // m:req.body.gender==='male'?'checked':'',
      // f:req.body.gender==='female'?'checked':'',
      // o:req.body.gender==='other'?'checked':''
    });
  } else {
    // Include the data of the profile to be rendered with this template
    // YOUR CODE HERE
    res.render('profile',{
      user:req.body
    });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
