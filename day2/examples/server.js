var express = require('express')
var fs = require('fs');

var app = express();
var poem = fs.readFileSync('./poem.txt', 'utf8');

app.listen(3000);

app.get('/', function(req, res) {
  res.send('The Horizons Poet API v1.0')
});

app.get('/api/poem', function(req, res) {
  res.send(poem);
});

app.post('/api/success', function(req, res) {
  res.json({success: true})
});

app.use('/api/*', function(req, res) {
  res.send('We couldn\'t find any routes matching that end point');
});
 
