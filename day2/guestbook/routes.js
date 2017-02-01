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
  // YOUR CODE HERE
  res.render('login');
});

router.use('/test/:hey', function(req, res){
  res.json({body: req.body, params: req.params, query: req.query})
})

// POST /login: Receives the form info from /login, sets a cookie on the client
// (the user's browser) and redirects to posts.
// This endpoint is implemented for you.
router.post('/login', function(req, res) {
  // data.save(req.body.username);
  res.cookie('username', req.body.username);

  res.redirect('/posts');
});

// ---Exercise 2. View Posts---

// GET /posts: View posts page
//
// Render 'posts.hbs` with the correct information.
//
// Hint: to get the username, use req.cookies.username
// Hint: use data.read() to read the post data from data.json
router.get('/posts', function (req, res) {

  var posts = data.read();

  if (req.query.order === 'ascending'){
    posts = data.read().sort(function(a,b) {
      var aTime = new Date(a.date);
      var bTime = new Date(b.date);
      console.log(aTime.getTime());
      console.log(bTime.getTime());
      return bTime.getTime() - aTime.getTime();
    })
    data.save(posts);

  } else if (req.query.order === 'descending'){
    posts = data.read().sort(function(a,b) {
      var aTime = new Date(a.date);
      var bTime = new Date(b.date);
      return aTime.getTime() - bTime.getTime();
    })
    data.save(posts);
  }

  if (req.query.author) {
    posts = data.read().filter(function(item){
      return (item.author === req.query.author)
    })
  }
  res.render('posts', {
    // Pass `username` to the template from req.cookies.username
    // Pass `posts` to the template from data.read()
    // YOUR CODE HERE
    username: req.cookies.username,
    posts: posts

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
  // YOUR CODE HERE
  res.render('post_form')
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
  // YOUR CODE HERE
  console.log(req.body);
  var posts = data.read(data.js)

  posts.push({
    title: req.body.title,
    body: req.body.text,
    author: req.cookies.username,
    date: req.body.date,
  })

  data.save(posts);
  res.redirect('/posts')
});

module.exports = router;
