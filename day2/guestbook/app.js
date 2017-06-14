// This is the top level Express server application file.
var express = require('express');
var path = require('path');
var

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
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Make files in the folder `public` accessible via Express
app.use(express.static(path.join(__dirname, 'public')));

// We use this module to store and retrieve data.
// data.read(): Read the latest data stored on disk.
// data.write(data): Write the given data to disk.
var data = require('./data');
var order = "ascending";
var author;
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
  if (req.query.order === "ascending") {
    order = "ascending";
  } else if (req.query.order === "descending") {
    order = "descending"
  }
  if (order === "ascending") {
    var arr = data.read();
    arr.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date)
    })
  } else {
    var arr = data.read();
    arr.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date)
    })
  }
  var new_arr = [];
  if (req.query.author) {
    if (req.query.author === "show all") {
      author = "";
    } else {
      author = req.query.author;
    }
  }
  if (author) {
    arr.forEach(function(element) {
      if (element.author === author)
        new_arr.push(element)
    })
  } else {
    new_arr = arr;
  }
  res.render('posts', {
    // Pass `username` to the template from req.cookies.username
    // Pass `posts` to the template from data.read()
    username: req.cookies.username,
    posts: new_arr
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
  res.render('post_form')
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
  console.log(req.cookies)
  if (!(req.cookies.username)) {
    res.status(400).send("You are not logged in");
    return;
  }
  req.check("title", "Enter a valid title.").notEmpty();
  req.check("body", "Enter a valid body.").notEmpty();
  req.check("date", "Enter a valid date").notEmpty().isDate();
  var errors = req.validationErrors();
  if (errors) {
    console.log(errors)
    res.status(401).send(errors[0].msg);
    return;
  } else {
    var arr = data.read();
    arr.push(req.body);
    data.save(arr);
  }
});

// Start the express server
var port = '3000'
app.listen(port);
