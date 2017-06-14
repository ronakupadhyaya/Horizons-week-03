// YOUR CODE HERE
var express = require('express');
var app = express();
var fs = require('fs');
var poem = fs.readFileSync('./poem.txt', 'utf8');
var path = require('path');



app.listen(3000)
console.log("Started")

app.get('/', function(req,res){
  res.send("The Horizons Poet API v1.0.")
})

app.get('/api/poem', function(req,res){
  res.send(poem)
})

app.use('/api/*', function(req,res){
  res.send("We couldn’t find any routes matching this endpoint")
})
