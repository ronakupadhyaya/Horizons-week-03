var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// We use a variable to store the count
var count = 0;

// Display the current count
app.get('/', function(req, res) {
  res.render('index', {
    count: count
  });
})

// ---Task 1---
// POST /increment: create an endpoint (aka route) that increases the variable
// 'count' by one and redirects back to /

//Don't need to render here necessraily because you redirect to / where it
//renders, though you could render here before rendering probably

//dangerous to render on a post request, becuase if you refresh the page, it will
//do whatever you just did again -- purchase twice, for example

//but instead you can refresh with the redirect

app.post('/increment', function(req, res) {
	count++;
  res.redirect('/');
});

// ---Task 2---
// POST /decrement: create an endpoint (aka route) that decreases the variable
// 'count' by one and redirects back to /

app.post('/decrease', function(req, res) {
	count--;
  res.redirect('/');
});

app.listen(3000);
