// YOUR CODE HERE
var express = require('express');
var app = express();
var fs = require('fs');
var poem = fs.readFileSync('./poem.txt', 'utf8');


app.get('/', function(req, res) {
  res.send('The Horizons Poet API v1.0');
})


app.get('/api/poem', function(req, res) {
  res.send(poem);
})

app.post('/api/poem', function(req, res) {
  res.json({success: true});
})

app.use('/api/*', function(req, res) {
  res.send('We couldn’t find any routes matching this endpoint');
})

console.log("THE SERVER IS RUNNING!!! ITS ON FIRE!!!!cd")
app.listen(3000);
