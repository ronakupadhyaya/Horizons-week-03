var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.send("Great, you're starting the Postman warmup exercise!");
})

app.get('/1', function(req,res) {
  res.send('Success. Part 1 complete');
})

app.put('/2', function(req, res) {
  res.send("{ "foods": ["bacon", "lettuce", "tomato"] }")
})
