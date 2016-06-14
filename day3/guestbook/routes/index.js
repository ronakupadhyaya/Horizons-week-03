var express = require('express');
var router = express.Router();

//this will respond to http://127.0.0.1:3000/login
router.get('/login', function(req, res) {
  res.render('login', { title: 'Log In' });
});


router.post('/login', function(req, res) {
  //  console.log(req.body);
    res.cookie('username', req.body.username).redirect('/posts');
});

router.get('/posts', function(req, res) {
  res.render('posts', { title: 'Posts' });
});
router.get('/posts/new', function(req, res) {
  res.render('post_form', { title: 'New Post' });
});

router.post('/posts', function(req, res) {
  var post = {
    author: req.cookies.username,
    date: req.body.date,
    title: req.body.title,
    text: req.body.text
  }
  console.log(post)
  res.redirect('/posts')
  //res.render('posts', { title: 'Posts' });

});



module.exports = router;
