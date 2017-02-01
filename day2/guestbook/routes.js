"use strict";
var express = require('express');
var router = express.Router();

// We use this module to store and retrieve data.
// data.read(): Read the latest data stored on disk.
// data.write(data): Write the given data to disk.
var data = require('./data');

router.get('/', function(req, res) {
  res.send('Your server is working!');
});

// ---Exercise 1. Login form---

// GET /login: The login page
// Make this endpoint render the template 'views/login.hbs' using res.render().
//
// Remember that when using res.render() you only need to give it the name of the
// of the template without .hbs
//
// For example if you wanted to render 'views/index.hbs' you'd do res.render('index')
router.get('/login', function(req, res) {
  res.render('login')
});

// POST /login: Receives the form info from /login, sets a cookie on the client
// (the user's browser) and redirects to posts.
// This endpoint is implemented for you.
router.post('/login', function(req, res) {
  res.cookie('username', req.body.username);
  res.redirect('/posts');
});

router.post('/logout', function(req, res) {
  res.clearCookie('username');
  res.redirect('/login');
});

// ---Exercise 2. View Posts---

// GET /posts: View posts page
//
// Render 'posts.hbs` with the correct information.
//
// Hint: to get the username, use req.cookies.username
// Hint: use data.read() to read the post data from data.json
router.get('/posts', function (req, res) {
  var d = data.read();

  // for sorting
  if(req.query.order === 'ascending') {
    d.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  } else if(req.query.order === 'descending') {
    d.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }
  d.forEach(function(item) {
    if (!item.author) {
      item.author = req.cookies.username;
    } // took out "else" because we want the following code to run no matter what
    if(req.query.author === item.author) {
      console.log('inside sorting')
      d = d.filter(function(value) {
        return value.author === req.query.author;
      });
    }
  });

  res.render('posts.hbs', {
    // Pass `username` to the template from req.cookies.username
    // Pass `posts` to the template from data.read()
    username: req.cookies.username,
    posts: d
  });
});

// ---Exercise 3. Create new posts---
// GET /posts/new: Renders a form for the user to create a new form.
//
// Render 'post_form.hbs'.
//
// User must be logged in to be able to visit this page. If
// the user is not logged in display an error.
//
// Hint: check req.cookies.username to see if user is logged in
router.get('/posts/new', function(req, res) {
  if(!req.cookies.username) {
    throw 'Error';
  } else {
    res.render('post_form');
  }
});

// POST /posts:
// This route is called by the form on /posts/new when a new post is being created.
//
//
// Create a new post object with right author, title, body and date.
// Read author, title, body, date from req.body.
//
// Example post object:
// {author: 'Moose', date: '5/14/2006', title: 'Hey', body: 'How is it goin?'}
//
// Use express-validator to check that the user is logged in and that title, body
// and date are all specified.
// Don't forget to check if there are validation errors at req.validationErrors();
//
// Read all posts with data.read(), .push() the new post to the array and
// write it back wih data.save(array).

var expressValidator = require('express-validator');
router.use(expressValidator());


router.post('/posts', function(req, res) {
  console.log(req.body);
  // req.cookies.username;
  var errors = req.validationErrors();
  var newArr = data.read();
  var newObj = {}
  if(errors){
    console.log('in errors');
    if(!req.cookies.username) {
      res.status(401).send('User not logged in');
    } else if(!req.body.title || !req.body.body || !req.body.date) {
      res.status(400).send('Missing elements');
    }
  } else {
    newObj = {
      author: req.body.author,
      title: req.body.title,
      body: req.body.body,
      date: req.body.date
    };
    newArr.push(newObj);
    data.save(newArr);
    res.redirect('/posts');
  }
});

module.exports = router;
