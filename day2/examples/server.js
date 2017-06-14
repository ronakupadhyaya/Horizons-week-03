var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.send("The Horizons Poet API v1.0")
});

app.get('/api/*', function(request, response) {
  response.send("We couldn’t find any routes matching this endpoint")
});

app.get('/api/poem', function(request, response) {
  var fs = require('fs');
  var poem = fs.readFileSync('./poem.txt', 'utf8');
  response.send(poem)
});

app.get('/api/success', function(request, response) {
  response.json({success: true})
});

app.listen(3000);
