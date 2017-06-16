1// This is the top level Express server application file.
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
  res.render('login' );
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
  var dataArr = data.read();
  if (req.query.order === 'ascending'){
    dataArr.sort(function(a,b){
      //sort method 1
      var time1 = a.date.split('/');
      var time2 = b.date.split('/');
      if(time1[2]<time2[2]){return -1}
      else if(time1[2]>time2[2]){return 1}
      else{
        if(time1[0]<time2[0]){return -1}
        else if(time1[0]>time2[0]){return 1}
        else{
          if(time1[1]<time2[1]){return -1}
          else {return 1}}
      }
    })
  }

  else if (req.query.order === 'descending'){
    dataArr.sort(function(a,b){
      //sort method 2
      var time1 = new Date(a.date);
      var time2 = new Date(b.date);
      return time2-time1;
    })
  }

  if(req.query.author){
    dataArr = dataArr.filter(function(item){
      if(item.author === req.query.author){
        return true;
      }
      return false;
    })
  }

  res.render('posts', {
    // Pass `username` to the template from req.cookies.username
    // Pass `posts` to the template from data.read()
    // YOUR CODE HERE
    username: req.body.username,
    posts:dataArr,
    author:req.query.author,
    order:req.query.order
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
  if(req.cookies.username){res.render('post_form')}
  else{res.send("Error!")}
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
  // YOUR CODE HERE
  var author = req.cookies.username;
  var title = req.body.title;
  var body = req.body.body;
  var date = req.body.date;
  if(req.cookies.username){
    if(title&&body&&date){
      var newPost = {
        author:author,
        title:title,
        body:body,
        date:date
      }
      dataArr.push(newPost);
      data.save(dataArr);
      res.redirect("/posts")
    }else{
      res.status(401).send('401 error')
    }
  } else {
    res.status(400).send('400 error')
  }

});

// Start the express server
var port = '3000'
app.listen(port);
