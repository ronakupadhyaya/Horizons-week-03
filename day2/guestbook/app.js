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

// Enable form validation with express validator.
var expressValidator = require('express-validator');
app.use(expressValidator());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Make files in the folder `public` accessible via Express
app.use(express.static(path.join(__dirname, 'public')));

// We use this module to store and retrieve data.
// data.read(): Read the latest data stored on disk.
// data.write(data): Write the given data to disk.
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
  res.render('login')
});

// POST /login: Receives the form info from /login, sets a cookie on the client
// (the user's browser) and redirects to posts.
// This endpoint is implemented for you.
app.post('/login', function(req, res) {
  res.cookie('username', req.body.username);
  res.redirect('/posts');
});

app.get('/posts/new', function(req, res) {
  if (req.cookies.username!==undefined){
    res.render('post_form');
  }

});
// ---Part 2. View Posts---

// GET /posts: View posts page
//
// Render 'posts.hbs` with the correct information.
//
// Hint: to get the username, use req.cookies.username
// Hint: use data.read() to read the post data from data.json
// console.log(data1);
// app.get('/posts', function (req, res) {
//   res.redirect('/posts/ascending')
// });

app.get('/posts', function (req, res) {
  var data1 = data.read('data.json')
  if (req.query.order==='ascending'){
    data1.sort(function(a,b){
      return new Date(a.date) - new Date(b.date)
    })
  }
  if (req.query.order==='descending'){
    data1.sort(function(a,b){
      return new Date(b.date) - new Date(a.date)
    })
  }

  if (req.query.author){
  var data2=[];
  for (var i = 0; i < data1.length; i++) {
    if (req.query.author=== data1[i]['author']){
      data2.push(data1[i])
    }
  }data1=data2}

  res.render('posts', {
    posts : data1,
    username:req.cookies.username
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
app.post('/posts', function(req, res) {
  // YOUR CODE HERE
  if (req.body.title===''||req.body.date===''||req.body.body===''){
  res.status(400).send('Error 400');
}

  var data1 = data.read();
  var post = {
    author:req.cookies.username,
    date:req.body.date,
    title:req.body.title,
    body: req.body.body
  }
  data1.push(post);
  data.save(data1);
  res.redirect('/posts');
});


// Start the express server
var port = '3000'
app.listen(port);
