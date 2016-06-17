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

app.get('/counter', function(req, res){
	res.json({
		count: counter
	});
});

// This is a JSON endpoint that increases the count and returns its current
// value.
app.post('/counter', function(req, res) {
  counter++;
  res.json({
    count: counter
  });
});

// ---Task 2---
// POST /decrement: Create another JSON endpoint that decreases `count` by 1
// and returns a JSON response indicating the new value of `count`.

app.delete('/counter', function(req, res){
	counter--;
	res.json({
		count: counter
	});
});

app.listen(3000);
