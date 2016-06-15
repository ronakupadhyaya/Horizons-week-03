"use strict";
var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var file = 'data.json';
var posts = jsonfile.readFileSync(file);


// LOGIN
// GET LOGIN: Renders the form to log into the app
router.get('/login', function(req, res) {
  res.render('login', { title: 'Log In' });
});

// POST LOGIN: Receives the form info for the user, sets a cookie and redirects
// to posts.
router.post('/login', function(req, res) {
  res.cookie('username', req.body.username).redirect('/posts');
});


// POSTS
// GET POSTS: Renders a list of all available posts. No need to be logged in.
router.get('/posts', function (req, res) {

  var displayposts = posts;
  if (req.query.username){
    displayposts = displayposts.filter(function(post){
      return post.author===req.query.username
    });
  }
  if (req.query.order==='ascending'){
    displayposts.sort(function(a,b) { return new Date(a.date) - new Date(b.date); })
  } else {
    displayposts.sort(function(a,b) { return new Date(b.date) - new Date(a.date); })
  }
  res.render('posts', {
    title: 'Posts',
    posts: displayposts
  });
});



// GET POSTS: Renders the form page, where the user creates the request.
// User must be logged in to be able to visit this page.
router.get('/posts/new', function(req, res) {
  if (req.cookies && req.cookies.username){
    res.render('post_form', { title: 'New Post' });
  }
  else{ console.log("not logged") }
});

// POST POSTS: This route receives the information for the new post. User must
// be logged in to use this route. It should create a new post and redirect to
// posts
router.post('/posts', function(req, res) {

  req.checkBody('title', 'Title must not be empty').notEmpty();
  req.checkBody('text', 'Title must not be empty').isEmail()

  if (req.cookies && req.cookies.username){
    var post = {
      author: req.cookies.username,
      date: req.body.date,
      title: req.body.title,
      text: req.body.text
    }
    posts.push(post);
    jsonfile.writeFileSync(file, posts);
    res.redirect('/posts')
  }
});

module.exports = router;
