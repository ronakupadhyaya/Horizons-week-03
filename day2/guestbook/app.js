// This is the top level Express server application file.
var express = require('express');
var path = require('path');
var _ = require('underscore');

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
var loggedin = false;
app.get('/', function(req, res) {
  res.send('Your server is working!');
});

// ---Part 1. Login form---

// GET /login: The login page
// Make this endpoint render the template 'views/login.hbs' using res.render().
app.get('/login', function(req, res) {
  // console.log(req.body);
  // YOUR CODE HERE
  res.render('login', {
    // username: req.body.username
  });
});

// POST /login: Receives the form info from /login, sets a cookie on the client
// (the user's browser) and redirects to posts.
app.post('/login', function(req, res) {
  res.cookie('username', req.body.username);
  loggedin = true;
  res.redirect('/posts');
});

// ---Part 2. View Posts---
app.use(function(req,res,next){
  if(!req.cookies.username){
    res.status(401).send('not logged in');
  }else{
    next();
  }
})

// GET /posts: View posts page
//
// Render 'posts.hbs` with the correct information.
app.get('/posts', function (req, res) {

  var unorderedposts = data.read();
  if(req.query.order === 'ascending'){
    unorderedposts = _.sortBy(unorderedposts,'date');
  } else if(req.query.order == 'descending'){
    var arr = _.sortBy(unorderedposts,'date');
    unorderedposts= arr.reverse();
  }


  if(req.query.author){
    unorderedposts = unorderedposts.filter(function(post){
      return post.author==req.query.author;
    })
  }
  res.render('posts', {
    username: req.cookies.username,
    posts: unorderedposts,
    order: req.query.order,
    filterBy: req.query.author
  });
});

// ---Part 3. Create new posts---
// GET /posts/new: Renders a form for the user to create a new form.
app.get('/posts/new', function(req, res) {
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
  req.checkBody('body','Invalid body').notEmpty();
  req.checkBody('title','Invalid title').notEmpty();
  req.checkBody('date','Invalid date').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    errors.forEach(function(error){
      if(error.param==='body' || error.param==='title' || error.param==='date' ){
         res.status(400).send('missing fields');
      }
    })

  }else{
    var post = {
      author: req.cookies.username,
      title: req.body.title,
      body: req.body.body,
      date: req.body.date
    }
    // data.write(post);
    var posts = data.read();
    posts.push(post);
    data.save(posts);
    res.render('posts', {
      username: req.cookies.username,
      posts: data.read()
    });
  }

});

// Start the express server
var port = '3000'
app.listen(port);
