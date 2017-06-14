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
  // YOUR CODE HERE
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

  var postObj = data.read();
  // console.log(postObj);
  var authfilt=false;
  var author = req.query.author;
  if (req.query.author){
    authfilt=true;
    postObj = postObj.filter(function(a){
      return a.author === author;
      console.log(authfilt);
    });
  }

  var order = req.query.order;
  var descending = (req.query.order === 'descending');
  var ascending = (req.query.order === 'ascending');
  var asc = postObj.sort(function(a, b){
    var aTime = new Date(a.date).getTime();
    var bTime = new Date(b.date).getTime();
    return parseFloat(aTime) - parseFloat(bTime);
  });
  var neither = (req.query.order !=='ascending') && (req.query.order !=='descending')

  var desc = [];
  for (var i = asc.length-1; i >= 0 ; i--) {
    desc.push(asc[i]);
  }
  res.render('posts', {
    username:req.cookies.username,
    posts: postObj,
    ascending: ascending,
    descending: descending,
    asc: asc,
    desc: desc,
    neither: neither,
    authfilt:authfilt
    // Pass `username` to the template from req.cookies.username
    // Pass `posts` to the template from data.read()
    // YOUR CODE HERE
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
  if(req.cookies.username === undefined || req.cookies.username === ' '){
    res.status(401).send("User is not logged in");
  } else {
    res.render('post_form');
  }
});


// else if(!req.query.title||!req.query.body||!req.query.date){
//   res.status(400).send(" Missing Info");
// }
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
  var oldPosts=data.read();
  // req.checkBody('title', 'Empty title').notEmpty();
  var titleCheck = req.checkBody('title', 'Empty title').notEmpty().validationErrors;
  var bodyCheck = req.checkBody('body', 'Empty title').notEmpty().validationErrors;
  var dateCheck = req.checkBody('date', 'Empty title').notEmpty().validationErrors;
  // console.log(req.sanitizeBody('date').toDate());
  if (req.sanitizeBody('date').toDate() === null){
    res.status(403).send('Wrong date format');
  } else if (!titleCheck.length && !bodyCheck.length && !dateCheck.length){
    var newPost={
      author: req.cookies.username,
      title: req.body.title,
      body:req.body.body,
      date:req.body.date
    };
    oldPosts.push(newPost);
    data.save(oldPosts);
  } else {
    res.status(402).send('Something went wrong');
  }

});

// Start the express server
var port = '3000'
app.listen(port, function(){console.log("Running at port"+ port);});
