var express = require('express');
var path = require('path');

var app = express();

// Add static files to Express
app.use(express.static(path.join(__dirname, 'public')));

// Redirect / to /index.html since we're not going to be rendering
// html in the server in this exercise
app.get('/', function(req, res) {
  res.redirect('/index.html');
});

// We use a variable to keep count
var counter = 0;

// This is a JSON endpoint that increases the count and returns its current
// value.
app.post('/increment', function(req, res) {
  counter++;
  res.json({
    count: counter
  });
});

// ---Task 2---
// POST /decrement: Create another JSON endpoint that decreases `count` by 1
// and returns a JSON response indicating the new value of `count`.

app.post('/decrement', function(req, res) {
  counter--;
  res.json({
    count: counter
  });
});

app.listen(3000);
