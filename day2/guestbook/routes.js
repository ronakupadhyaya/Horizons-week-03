"use strict";
var express = require('express');
var router = express.Router();

// We use this module to store and retrieve data.
// data.read(): Read the latest data stored on disk.
// data.write(data): Write the given data to disk.
var data = require('./data');

router.get('/', function(req, res) {
  res.redirect('/login');
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
  res.clearCookie('username')
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
  var username = req.cookies.username;
  var posts = data.read();
  var authorFilter = req.query.author

  if (authorFilter) {
    posts = posts.filter(function(a) {
      return a.author === authorFilter;
    })
  };

  if (req.query.order === 'ascending') {
    posts.sort(function(a,b) {
      return new Date(a.date) - new Date(b.date);
    })
  } else if (req.query.order === 'descending') {
    posts.sort(function(a,b) {
      return new Date(b.date) - new Date(a.date);
    })
  };

  res.render('posts', {
    username: username,
    posts: posts,
    authorFilter: authorFilter
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
  if (req.cookies.username){
    res.render('post_form');
  } else {
    console.log("Error: User must be logged in")
  }
});

// POST /posts:
// This route is called by the form on /posts/new when a new post is being created.
//
//
// Create a new post object with right author, title, body and date.
// Read author, title, body, date from req.params.
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
router.post('/posts', function(req, res) {
  console.log(req.body)
  var post = {
    title: req.body.title,
    body: req.body.body,
    author: req.cookies.username,
    date: req.body.date,
  };

  function validate(req) {
    req.checkBody('title', 'Title must not be empty.').notEmpty();
    req.checkBody('date', 'Date must not be empty.').notEmpty();
    req.checkBody('body', 'Body must not be empty.').notEmpty();
  };

  validate(req);
  var errors = req.validationErrors();

  if (errors){
    console.log(errors)
    res.status(400).send('You must have a title, body, and date.');
  } else if (!req.cookies.username) {
    res.status(401).send('You must be logged in.');
  } else {
    var postArray = data.read()
    postArray.push(post);
    data.save(postArray)
    res.redirect('/posts')
  }
});

router.post('/delete', function(req, res) {
  var postArray = data.read();
  var chosen = req.body
  postArray = postArray.filter(function(a) {
    return !(a.author === chosen.author &&
              a.title === chosen.title &&
              a.date === chosen.date &&
              a.body === chosen.body)
  })
  data.save(postArray)
  res.redirect('/posts')
});

router.post('/deleteAll', function(req, res) {
  var postArray = data.read();
  var chosen = req.body
  postArray = postArray.filter(function(a) {
    return !(a.author === chosen.author)
  })
  data.save(postArray)
  res.redirect('/posts')
});

module.exports = router;
