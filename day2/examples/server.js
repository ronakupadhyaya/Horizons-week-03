// YOUR CODE HERE
// requires the express library
var express = require('express');
// initializes the app instance
var app = express();

app.get('/', function(req, res) {
  res.send('The Horizons Poet API v1.0');
});
// will need to use app.use() for this
app.get('/api/*', function(req, res) {
  res.send('We couldn’t find any routes matching this endpoint');
});
// Sends the text from the file poem.txt
app.get('/api/poem', function(req, res) {
  var fs = require('fs');
  var poem = fs.readFileSync('./poem.txt', 'utf8');
})

app.post('/api/success', function(req, res){
  res.json({success:true});
})

app.listen(3000);
