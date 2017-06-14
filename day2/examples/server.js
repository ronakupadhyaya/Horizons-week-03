// YOUR CODE HERE
var express = require("express");
var app = express();

var fs = require('fs');
var poem = fs.readFileSync('./poem.txt', 'utf8');

app.get('/', function (req, res) {
  res.send("The Horizons Poet API v1.0");
});


app.use('/api/*', function (req, res) {
  res.send("We couldn’t find any routes matching this endpoint");
})


app.get("/api/poem", function (req, res) {
  res.send(poem);
})

app.get("/api/success", function (req, res) {
  res.json({
    success: true
  });
});

app.listen(3000);
console.log('started');
