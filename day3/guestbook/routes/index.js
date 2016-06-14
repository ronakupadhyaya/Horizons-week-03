"use strict";
var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var file = 'data.json'
var posts = jsonfile.readFileSync(file)


// LOGIN
//this will respond to http://127.0.0.1:3000/login
router.get('/login', function(req, res) {
  res.render('login', { title: 'Log In' });
});

router.post('/login', function(req, res) {
  res.cookie('username', req.body.username).redirect('/posts');
});

// POSTS
router.get('/posts', function(req, res) {
  res.render('posts', { title: 'Posts' });
  console.log(posts)
});
router.get('/posts/new', function(req, res) {
  if (req.cookies && req.cookies.username){
    res.render('post_form', { title: 'New Post' });
  }
  else{ console.log("not logged") }
});

router.post('/posts', function(req, res) {
  var post = {
    author: req.cookies.username,
    date: req.body.date,
    title: req.body.title,
    text: req.body.text
  }
  posts.push(post);
  jsonfile.writeFileSync(file, posts);
  console.log(post)
  res.redirect('/posts')
});



module.exports = router;
