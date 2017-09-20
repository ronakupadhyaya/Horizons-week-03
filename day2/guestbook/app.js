// This is the top level Express server application file.
var express = require('express');
var path = require('path');

var app = express();

// Enable cookie parsing
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Make files in the folder `public` accessible via Express
app.use(express.static(path.join(__dirname, 'public')));

// We use this module to store and retrieve data.
// data.read(): Read the latest data stored on disk.
// data.save(data): Save the given data to disk.
var data = require('./data');

app.get('/', function(req, res) {
  res.send('Your server is working!');
});

// ---Part 1. Login form---

// GET /login: The login page
// Make this endpoint render the template 'views/login.hbs' using res.render().
//
// Remember that when using res.render() you only need to give it the name of the
// of the template without .hbs
//
// For example if you wanted to render 'views/index.hbs' you'd do res.render('index')
app.get('/login', function(req, res) {
  // YOUR CODE HERE
  res.render('login.hbs', {

  })
});

// POST /login: Receives the form info from /login, sets a cookie on the client
// (the user's browser) and redirects to posts.
// This endpoint is implemented for you.
app.post('/login', function(req, res) {
  res.cookie('username', req.body.username);
  res.redirect('/posts');
});

// ---Part 2. View Posts---

// GET /posts: View posts page
//
// Render 'posts.hbs` with the correct information.
//
// Hint: to get the username, use req.cookies.username
// Hint: use data.read() to read the post data from data.json
app.get('/posts', function (req, res) {
  var order = req.query.order;
  var author = req.query.author;
  var posts = data.read();
  if (order === 'ascending') {
    posts.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date)
    })
  }
  if (order === 'descending') {
    posts.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date)
    })
  }
  if (req.query.noAuthor) author = null;
  if (author) {
    posts = posts.filter(function(item, index) {
      return item.author === author
    })
  }
  res.render('posts', {
    posts: posts,
    username: req.cookies.username,
    author: author
  });
});

// ---Part 3. Create new posts---
// GET /posts/new: Renders a form for the user to create a new form.
//
// Render 'post_form.hbs'.
//
// User must be logged in to be able to visit this page. If
// the user is not logged in display an error.
//
// Hint: check req.cookies.username to see if user is logged in
app.get('/posts/new', function(req, res) {
  // YOUR CODE HERE
  var loggedIn = false;
  if (req.cookies.username) loggedIn = true;
  res.render('post_form', {
    loggedIn: loggedIn
  })
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
// Make sure to check that the user is logged in and that title, body
// and date are all specified.
//
// Read all posts with data.read(), .push() the new post to the array and
// write it back wih data.save(array).
app.post('/posts', function(req, res) {
  // YOUR CODE HERE
  if (!req.cookies.username) {
    //error 401
    res.render('post_form', {
      error: 'Error code 401'
    })
  }
  if (req.cookies.username && req.body.title && req.body.body && req.body.date) {
    //good to go
    var newPost = {
      author: req.cookies.username,
      title: req.body.title,
      body: req.body.body,
      date: req.body.date,
    }
    var posts = data.read();
    posts.push(newPost)
    data.save(posts)
    res.render('posts', {
      username: req.cookies.username,
      loggedIn: true,
      posts: data.read()
    })
  }
  else {
    //error 400
    res.render('post_form', {
      error: 'Error code 400'
    })
  }
});

// $('body').on('click', '.delete', function(event) {
//   var $this = $(this);
//   this.parent().parent().remove();
// })



// Start the express server
var port = '3000'
app.listen(port);
