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

var admins = ["Caroline"];

// ---Part 1. Login form---

// GET /login: The login page
// Make this endpoint render the template 'views/login.hbs' using res.render().
//
// Remember that when using res.render() you only need to give it the name of the
// of the template without .hbs
//
// For example if you wanted to render 'views/index.hbs' you'd do res.render('index')
app.get('/login', function(req, res) {
  res.render('login');
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
  dataCopy = data.read();


  var del = req.query.delete;
  if(del) {
    dataCopy.forEach(function(entry) {
      if(entry.title === del || entry.author === del) {
        entry.del = true;
      }
    })
  }

  data.save(dataCopy);

  dataCopy = dataCopy.filter(function(entry) {
    if(entry.hasOwnProperty("del")) {
      return false;
    } else {
      return true;
    }
  })

  var username = req.cookies.username;
  var isAdmin = false;
  if (admins.includes(username)) {
    isAdmin = true;
  }

  if (req.query.order === "ascending") {
    dataCopy.sort(function(entry1, entry2) {
      var date1 = new Date(entry1.date);
      var date2 = new Date(entry2.date);
      return date1 - date2;
    })
  } else if (req.query.order === "descending") {
    dataCopy.sort(function(entry1, entry2) {
      var date1 = new Date(entry1.date);
      var date2 = new Date(entry2.date);
      return date2 - date1;
    })
  }

  var allShown = true;
  var author = req.query.author;
  if(author) {
    dataCopy = dataCopy.filter(function(entry) {
      return entry.author === author;
    })
    allShown = false;
  }

  res.render('posts', {
    // Pass `username` to the template from req.cookies.username
    username : username,
    // Pass `posts` to the template from data.read()
    posts : dataCopy,
    // YOUR CODE HERE
    admin : isAdmin,

    allShown : allShown,

    author : req.query.author,

    delete : del
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
  if (req.cookies.username) {
    res.render('post_form');
  } else {
    throw new Error("username not found");
  }
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
  var currData = data.read();
  if (!req.cookies.username) {
    throw new Error("username not found");
  }
  req.check('title', 'title DNE').notEmpty();
  req.check('body', 'body DNE').notEmpty();
  req.check('date', 'date DNE').notEmpty();
  err = req.validationErrors();
  if (err) {
    res.status(400).send("missing input");
  } else {
    var newObj = {
      author : req.cookies.username,
      date : req.body.date,
      title : req.body.title,
      body : req.body.body
    }
    currData.push(newObj);
    data.save(currData);
    res.redirect("/posts");
  }
});

// Start the express server
var port = '3000'
app.listen(port);
