// This is the top level Express server application file.
var express = require('express');
var path = require('path');
var i = 3;
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
  var arr = data.read();
  arr.sort(function compare(a, b){
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    if(dateA > dateB){
      return -1;
    } else if (dateA === dateB){
      return 0;
    } else if (dateA < dateB){
      return 1;
    }
  })
  if(order === 'ascending'){
    arr.reverse();
  }

  var author = req.query.author;
  if(author){
    var arr = arr.filter(function(item){
      return item.author === author;
    });
  }

  res.render('posts', {
    // Pass `username` to the template from req.cookies.username
    // Pass `posts` to the template from data.read()
    username: req.cookies.username,
    posts: arr,
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
  res.render('post_form');
});

app.get('/delete/:id', function(req, res){
  var arr = data.read();
  var index = arr.findIndex(function(item){
    return item.id === Number.parseInt(req.params.id, 10);
  });
  if(req.cookies.username === arr[index].id){
    arr.splice(index, 1);
    data.save(arr);
  }
  res.redirect('/posts');
});

app.get('/edit/:id', function(req, res){
  var arr = data.read();
  var post;
  arr.forEach(function(item, index){
    if (item.id === Number.parseInt(req.params.id, 10)){
      arr.splice(index, 1);
      post = item;
    }
  });
  data.save(arr);
  if(req.cookies.username !== post.author){
    res.send('You can\'t edit this post, you\'re not the original author!')
  } else {
    res.render('edit_form', {
      title: post.title,
      body: post.body
    });
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
  var post = {author: req.cookies.username, title: req.body.title, body: req.body.body, date: req.body.date, id: i};
  i++;
  if(!req.cookies.username){
    res.sendStatus(401);
    res.send('Error! You\'re not logged in');
  } else if(!(req.body.body && req.body.date && req.body.title)){
    res.sendStatus(400);
    res.send('Error! You didn\'t give all the inputs');
  } else {
    var a = data.read();
    a.push(post);
    data.save(a);
    res.redirect('/posts');
  }
});

// Start the express server
var port = '3000'
app.listen(port);
