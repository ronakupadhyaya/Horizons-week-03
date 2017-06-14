// YOUR CODE HERE
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send("The Horizons Poet API v1.0");
})

app.get('/api/poem', function(req, res){
  var fs = require('fs');
  var poem = fs.readFileSync('poem.txt', 'utf8');
  res.send(poem);
})

app.post('/api/success', function(req, res){
  res.json({success: true});
})

app.use('/api/*', function(req, res){
  res.send("We couldn’t find any routes matching this endpoint");
})

app.listen(3000);
