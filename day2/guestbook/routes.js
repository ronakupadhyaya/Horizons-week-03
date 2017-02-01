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
  // console.log("hello");
  //   res.render('login', { title: 'View all posts' });
  //   console.log(data.read());
});

// POST /login: Receives the form info from /login, sets a cookie on the client
// (the user's browser) and redirects to posts.
// This endpoint is implemented for you.
router.post('/login', function(req, res) {
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

// POSTS
// GET POSTS: Renders a list of all available posts. No need to be logged in.
// This function should render all the posts ordered descending by date if no params
// are passed of ir called: /posts?order=descending

// If the user visits the url /posts?order=ascending they should be ordered ascending

// If the function is called with a username like /posts?username=steven, you should
// filter all posts that aren't done by that user.
// Hint: to get the username, use req.query.username
// Don't forget to send the posts array to the view on the render method!
router.get('/posts', function (req, res) {
  // console.log(data.read());
  // console.log('123');
  console.log(data.read())
  res.render('posts', {
    username: req.cookies.username,
    posts: data.read(),
  //   // Pass `username` to the template from req.cookies.username
  //   // Pass `posts` to the template from data.read()
  //   // YOUR CODE HERE
  //
  //
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
});

module.exports = router;
