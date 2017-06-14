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
  res.render('login')
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

  if (req.cookies.username === '') {
    res.status(401).send('Error: Login before posting.');
  }

  var displayedData = data.read();

  if (req.query.author) {
    displayedData = displayedData.filter(function(datum) {
      console.log(datum.author);
      console.log(req.query.author);
      return (datum.author === req.query.author);
    });
  }

  if (req.query.order === "ascending") {
    displayedData.sort(function(p1, p2) {
      if (p1.date > p2.date)
        return 1;
      else if (p1.date === p2.date)
        return 0;
      else 
        return -1;
    });
  }
  else if (req.query.order === 'descending') {
    displayedData.sort(function(p1, p2) {
      if (p1.date < p2.date)
        return 1;
      else if (p1.date === p2.date)
        return 0;
      else 
        return -1;
    });
  }

  res.render('posts', {
    // Pass `username` to the template from req.cookies.username
    // Pass `posts` to the template from data.read()
    // YOUR CODE HERE
    username: req.cookies.username,
    posts: displayedData
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
  if (req.cookies.username === '') {
    res.statusCode(401).send('Error: Login before posting.')
  }
  res.render('post_form');
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
app.post('/posts', function(req, res) {
  if (req.body.title === '') {
    res.status(401).send('Error: Enter title before posting');
  }
  else if (req.body.body === '') {
    res.status(401).send('Error: Enter body before posting');
  }
  else if (req.body.date === '') {
    res.status(401).send('Error: Enter date before posting');
  }
  else {
    var arr = data.read();
    arr.push({
      author: req.cookies.username,
      title: req.body.title,
      body: req.body.body,
      date: req.body.date
    });
    data.save(arr);
    res.redirect('/posts');
  }
});

// Start the express server
var port = '3000'
app.listen(port);
