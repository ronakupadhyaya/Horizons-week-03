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
  res.render('login', { title: 'Log In' });
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
  var posts = data.read();
  var loggedin = req.cookies.username;
  var postsTDisp = posts;
  if (loggedin){
    var singleView = false;
    if(req.query.author){
      postsTDisp = postsTDisp.filter(function(post){
        return post.author === req.query.author
      });
      singleView = true
    }

    if (req.query.order==='ascending'){
      postsTDisp.sort(function(a,b) {return new Date(a.date) - new Date(b.date); })
    } else {
      postsTDisp.sort(function(a,b) {return new Date(b.date) - new Date(a.date); })
    }
    res.render('posts', {postsTDisp:  postsTDisp, singleView: singleView});
  }




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
  var loggedin = req.cookies.username;
  console.log(loggedin)
  if(loggedin.length){res.render('post_form')}


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
  var posts = data.read("/.data");
var loggedin = req.cookies.username;
  if(! loggedin.length){
    res.status(401).send({ error: 'You must be logged in to see this' })
  }else if (! (req.body.date && req.body.body && req.body.title)){
      res.status(400).send("Error: What's the point if you don't fill in all the boxes?")
  }else{var newpost = {
    author: req.cookies.username,
    date: req.body.date,
    title: req.body.title,
    text: req.body.body}
posts.push(newpost)
    data.save(posts)

    res.redirect('/posts')
  }




});

// Start the express server
var port = '3000'
app.listen(port);
