var express = require('express');
var fs = require('fs');
//initialize express app
var app = express();


//
// Reqest processing
//
app.get('/', function(req, res) {
  res.send("The Horizons Poet API v1.0")
});

var poem = fs.readFileSync('./poem.txt', 'utf8');
app.get('/api/poem', function(req, res) {
  res.send(poem)
});

app.post('/api/success', function(res, res) {
  res.json({
    success: true
  })
});

app.use('/api/*', function(req, res) {
  res.send("We couldn’t find any routes matching this endpoint")
});




app.listen(3000)
console.log("Server is running!");
