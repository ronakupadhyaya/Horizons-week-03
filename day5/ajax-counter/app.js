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
var count = 0;

// This is a JSON endpoint that increases the count and returns its current
// value.

app.post('/get', function(req, res) {
	res.json({
		count: count
	});
});

app.post('/count', function(req, res) {
  count++;
  res.json({
    count: count
  });
});

// ---Task 2---
// POST /decrement: Create another JSON endpoint that decreases `count` by 1
// and returns a JSON response indicating the new value of `count`.

app.delete('/count', function(req, res) {
  count--;
  res.json({
    count: count
  });
});

app.listen(3000);
