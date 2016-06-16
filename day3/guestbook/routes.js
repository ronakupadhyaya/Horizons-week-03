"use strict";
var express = require('express');
var jsonfile = require('jsonfile');

var router = express.Router();

// We use this module to store and retrieve data.
// data.read(): Read the latest data stored on disk.
// data.write(data): Write the given data to disk.
var data = require('./data');

// ---Part 1. Login---

// GET /login: Renders the form to log into the app when the user opens /login
// on their browser. This function is already implemented for you to have as a model.
// It passes the object with title : 'Log in' to the template
router.get('/login', function(req, res) {
  res.render('login', { title: 'Log In Test' });
});

// POST /login: Receives the form info for the user, sets a cookie on the client
// (the user's browser) and redirects to posts.
router.post('/login', function(req, res) {
  res.cookie('username', req.body.username).redirect('/posts');
});

// ---Part 2. View Posts---

// GET /posts: Renders a list of all available posts. No need to be logged in.
// This function should render all the posts ordered descending by date if no params
// are passed of if called: /posts?order=descending
// If the user visits the url /posts?order=ascending they should be ordered ascending
// If the function is called with a username like /posts?username=steven, you should
// filter all posts that aren't done by that user.
// Hint: to get the username, use req.query.username
// Hint: use jsonfile.readFileSync() to read the post data from data.json 


router.get('/posts', function (req, res) {
  var username = req.query.username;
  var order = req.query.order;
  console.log(order);
  var newData = data.read()
  if (order === 'ascending') {
    // console.log(data);
      newData = newData.sort(function(a,b) {
        if (Date.parse(a.date) > Date.parse(b.date)) {
          return 1;
        } else {
          return -1;
        }
      });
      res.render('posts', {
        title: 'Posts',
        posts: newData
      });
  } else {
      newData = newData.sort(function(a,b) {
        if (Date.parse(a.date) < Date.parse(b.date)) {
          return 1;
        } else {
          return -1;
        }
      });
      console.log(data);

      res.render('posts', {
        title: 'Posts',
        posts: newData
      });

    };
  });
  // if (username) {
  //   data.forEach(function(item) {
  //     if (item.name === username) {
  //       data.splice(indexOf(item),1);
  //     }
  //   })
  // }
  // This renders the posts
//   res.render('posts', {
//     title: 'Posts',
//     posts: data
//   });
//   // res.redirect('/posts?order=descending');
// });

// router.get('/posts', function (req, res) {
//   console.log("here");
//   data = data.sort(function(a,b) {
//     if (Data.parse(a.date) > Data.parse(b.date)) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
//   console.log(data);
//
//   res.render('posts', {
//     title: 'Posts',
//     posts: data
//   });
//
// });

// router.get('/posts?order=ascending', function (req, res) {
//   data = data.sort(function(a,b) {
//     if (Data.parse(a.date) > Data.parse(b.date)) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
//
//   res.render('posts', {
//     title: 'Posts',
//     posts: data
//   });
// });



// ---Part 3. New post form---
// GET /posts/new: Renders the form page, where the user creates the request.
// User must be logged in to be able to visit this page.
// Hint: if req.cookies.username is set, the user is logged in.
router.get('/posts/new', function(req, res) {
  // YOUR CODE HERE
  if (req.cookies.username) {
    res.render('post_form');
  }
});

// ---Part 4. Create new post
// POST /posts: This route receives the information for the new post. User must
// be logged in to use this route. It should create a new post and redirect to
// posts.
// It should also use express-validator to check if the title and body aren't empty.
// an example validation using express-validator is:
// req.checkBody('email', 'Email must not be valid').isEmail();
// Don't forget to check if there are validation errors at req.validationErrors();
// After updating data, you should write it back to disk wih data.save()

function validate(req) {
  req.checkBody('title', 'title must not be empty').notEmpty();
  req.checkBody('text', 'body must not be empty').notEmpty();
}

router.post('/posts', function(req, res) {
  console.log(req.body);
  // YOUR CODE HERE
  validate(req);
  var post = {
    name: req.body.name,
    date: new Date(),
    title: req.body.title,
    text: req.body.text
  };
  var errors = req.validationErrors();
  if (req.cookies.username) {
    console.log(errors);
    if (errors) {
      res.render('post_form', {errors: errors});
    } else {
      var postArray = data.read();
      postArray.push(post + '\n');
      data.save(postArray);
      res.redirect('/posts');
    }
  }

});

module.exports = router;
