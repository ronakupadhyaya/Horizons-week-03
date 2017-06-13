// This is the top level Express server application file.
var express           = require('express'),
    path              = require('path'),
    cookieParser      = require('cookie-parser'),
    exphbs            = require('express-handlebars'),
    expressValidator  = require('express-validator'),
    bodyParser        = require('body-parser'),
    data              = require('./data');

var app = express();




app.use(cookieParser());

// Set up handlebar templates

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Enable form validation with express validator.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(bodyParser.json());


// Make files in the folder `public` accessible via Express
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function(req, res) {
  res.send('Your server is working!');
});

// ---Part 1. Login form---

app.get('/login', function(req, res) {
  res.render("login");
});

// POST /login: Receives the form info from /login, sets a cookie on the client
// (the user's browser) and redirects to posts.
// This endpoint is implemented for you.
app.post('/login', function(req, res) {
  res.cookie('username', req.body.username);
  res.redirect('/posts');
});

// ---Part 2. View Posts---
app.get('/posts', function (req, res) {
  res.render('posts', {
    username: req.cookies.username,
    posts: data.read()
  });
});

// ---Part 3. Create new posts---
app.get('/posts/new', function(req, res) {
  res.render("post_form");
});

app.post('/posts', function(req, res) {
  //req.checkCookies("username", "you need to login").notEmpty();
  req.checkBody("title", "Please add a title").notEmpty();
  req.checkBody("date", "Please add a date").notEmpty();
  req.checkBody("body", "Please add a date").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
      res.json({ errors: errors });
  }

  var post = {
    author: req.cookies.username,
    date: req.body.date,
    title: req.body.title,
    body: req.body.body
  }

  var oldPosts = data.read();
  oldPosts.push(post);
  data.save(oldPosts);
  res.redirect("/posts");
});

app.get("/logout", function(req, res) {
  res.clearCookie("username");
  res.redirect("/login");
})




// Start the express server
var port = '3000'
app.listen(port);
