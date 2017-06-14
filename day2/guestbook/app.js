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

var _ = require('underscore')

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
    res.render('login', {Username: req.query.username})
});

// POST /login: Receives the form info from /login, sets a cookie on the client
// (the user's browser) and redirects to posts.
// This endpoint is implemented for you.
app.post('/login', function(req, res) {
    res.cookie('username', req.body.username);
    if (req.body.username === 'Admin') {
        res.redirect('/admin/posts')
    } else {
        res.redirect('/posts');
    }
});

app.get('/admin/posts/delete/:index', function (req, res) {
    var arr = data.read()
    arr.splice(req.params.index, 1)
    console.log(arr)
    data.save(arr)
    res.redirect('/admin/posts')
});

app.get('/admin/posts/authorDel/:author', function (req, res) {
    var arr = data.read()
    arr = _.filter(data.read(), function(obj){ return obj.author !== req.params.author})
    data.save(arr)
    res.redirect('/admin/posts')
});


app.get('/admin/posts/', function (req, res) {
    res.render('admin', { posts: data.read() });
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
    var user = req.cookies.username
    if (user !== 'undefined') {
        res.render('post_form', {
            Title: req.query.title,
            Body: req.query.body,
            date: req.query.date
        })
    } else {
        res.status(500).send('You need to be logged in!')
    }
});

app.post('/posts', function(req, res) {
    req.check('title', 'Title required.').notEmpty()
    req.check('body', 'Body required.').notEmpty()
    req.check('date', 'Date required.').notEmpty()
    var errors = req.validationErrors()
    // console.log(errors)
    if (errors) {
        res.status(400)
        res.render('posts', {
            // Pass `username` to the template from req.cookies.username
            // Pass `posts` to the template from data.read()
            username: req.cookies.username,
            posts: data.read()
        })
    }

    var obj = {'author': req.cookies.username,
    'date': req.body.date,
    'title': req.body.title,
    'body': req.body.body}
    var arr = data.read()
    arr.push(obj)
    data.save(arr)

    res.render('posts', {
        // Pass `username` to the template from req.cookies.username
        // Pass `posts` to the template from data.read()
        username: req.cookies.username,
        posts: data.read()
    })
});

// Start the express server
var port = '3000'
app.listen(port);
