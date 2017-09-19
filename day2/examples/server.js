// YOUR CODE HERE
var express = require('express');
var app = express();

var fs = require('fs');
var poem = fs.readFileSync('./poem.txt', 'utf8');

app.get('/', function(request, response){
  response.send('The Horizon Poet API v.1.0');
});

app.get('/api/poem', function(request, response){
  response.send(poem);
})

app.put('/api/success', function(request, response){
  response.json({success: true});
})

app.use('/api/*', function(request, response){
  response.send('We couldn’t find any routes matching this endpoint');
});

app.listen(3000);
