// YOUR CODE HERE
var express = require('express');
var fs = require('fs');

var app = express();

//get route
app.get("/", function(request, response){
  response.send("The Horizons Poet API v1.0");
});

app.get("/api/poem", function(request, response){
  var poem = fs.readFileSync('./poem.txt', 'utf8');
  response.send(poem);
});

app.post("/api/success", function(request, response){
  res.json({success: true});
});

app.get("/api/*", function(request, response){
  response.send("We couldn't find any routes matching this endpoint");
});

app.listen(3000);
console.log("Running...");
