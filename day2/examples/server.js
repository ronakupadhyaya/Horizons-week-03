// Require...
var express = require('express');
var app = express();
var fs = require('fs');
var poem = fs.readFileSync('./poem.txt', 'utf8');

// Main page request
app.get('/', function(req, res) {
  res.send("The horizons Poet API v1.0");
});

// Request for the poem page
app.get('/api/poem', function(req, res){
  res.send(poem); // Send the poem from the file we read in
})

// Send the JSON obj indicating the request was successful!
app.post('/api/success', function(req, res) {
  res.json("{success: true}");
})

// This will handle bad requests
app.get('/api/*', function(req, res){
  res.send("We couldn't find any routes matching this endpoint");
})

app.listen(3000);
