// YOUR CODE HERE

var express = require('./node_modules/express');
var app = express();

app.get('/', function(req, res){
  res.send('The Horizons Poet API v1.0');
});

var fs = require('fs');
var poem = fs.readFileSync('./poem.txt', 'utf-8');
console.log(poem);

app.use('/api/poem', function(req, res){
  res.send(poem);
});

app.get('/api/*', function(req, res){
  res.send('We couldn’t find any routes matching this endpoint');
});

app.post('/api/success', function(req, res){
  res.json({success: true});
});

app.listen(3000);
console.log('Working');
