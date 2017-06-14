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
  var link = false;
  var admin = req.cookies.username === "admin" || req.cookies.username === "Admin";
  function ascendingComparator(a, b) {
    return new Date(a.date) - new Date(b.date);
  }
  function descendingComparator(a, b) {
    return new Date(b.date) - new Date(a.date);
  }
  var dataSort = data.read();
  if(req.query.order){

    if (req.query.order === 'ascending'){

      dataSort.sort(ascendingComparator);
    }else if (req.query.order === 'descending'){

      dataSort.sort(descendingComparator);
    }
  }
  if(req.query.author){
    link = true;
    dataSort = dataSort.filter(function(item){
      return item.author === req.query.author
    })
  }
  console.log(link);
  res.render('posts', {
    username:req.cookies.username,
    posts:dataSort,
    linkData:link,
    admin:admin
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
  var today = new Date();
    var date = (today.getMonth()+1)+'/'+today.getDate() + '/' + today.getFullYear();
    if (req.cookies.username){
      res.render('post_form',{
        date:date
      })
    }else{
      res.render('post_form',{
        error: 'Not logged in',
        date:date
      })
    }
});

app.get('/posts/delete', function(req,res) {
  var author = req.query.author;
  var date = req.query.date;
  var dataArr=data.read();
  console.log(author);
  dataArr = dataArr.filter(function(item){
    return item.author !== author && item.date !== date
  })

  data.save(dataArr);
  res.redirect('/posts');



})

app.get('/posts/edit',function(req,res) {
  var author = req.query.author;
  var date = req.query.date;
  var body = '';
  var dataArr=data.read();
  dataArr = dataArr.filter(function(item){
    return item.author === author && item.date === date
  })
  res.render('edit',{
    author:author,
    date:date,
    body:dataArr[0].body
  })
})

app.post('/posts/edit', function(req,res){
  req.checkBody('author','You need an author').notEmpty();
  req.checkBody('body','You need a body').notEmpty();
  req.checkBody('date','You need a date').notEmpty();
  console.log(req.body.body);
  console.log(req.body.author);
  console.log(req.body.date);
  var result = req.validationErrors();
  if (result){
    res.status(400).render('edit',{
      error:'Title, body, and/or date cannot be blank!'
    })
  }else if(!req.cookies.username){
    res.status(401).render('edit',{
      error: 'You must be logged in'
    })
  }else if(!result){
    var author = req.body.author;
    var date = req.body.date;
    var dataArr=data.read();
    var post = dataArr.find(function(item){
      return item.author === author && item.date === date
    })
    console.log(req.body.body);
    console.log();
    dataArr[dataArr.indexOf(post)].body = req.body.body;
    data.save(dataArr);
    res.redirect('/posts');
  }
})

// app.post('/posts/edit',function(req,res){
//   var dataArr = data.read();
//   var newBody = req.body.body;
//   dataArr = dataArr.filter(function(item){
//     return item.author !== author && item.date !== date
//   })
//   dataArr[0].body = newBody;
//   data.save(dataArr);
//   res.redirect('/posts');
//
// })
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
    req.checkBody('title','You need a title').notEmpty();
    req.checkBody('body','You need a body').notEmpty();
    req.checkBody('date','You need a date').notEmpty();
    var result = req.validationErrors();
    if (result){
      res.status(400).render('post_form',{
        error:'Title, body, and/or date cannot be blank!'
      })
    }else if(!req.cookies.username){
      res.status(401).render('post_form',{
        error: 'You must be logged in'
      })
    }else if(!result){
      // {
      //   title: req.body.title,
      //   body: req.body.body,
      //   date: req.body.date
      // })
    obj = {
      title: req.body.title,
      body: req.body.body,
      author: req.cookies.username,
      date: req.body.date
    }
    var dataArr = data.read();
    dataArr.push(obj)
    data.save(dataArr)
    console.log('hey');
    res.redirect('/posts');
  }
});

// Start the express server
var port = '3000'
app.listen(port);
