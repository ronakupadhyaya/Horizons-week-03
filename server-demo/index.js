var express = require('express'); //don't forget npm install --save express, import express package
var exphbs = require('express-handlebars');
var path = require('path');

var app = express(); //creates your server!

//set up handlebars view engine
app.set('views', path.join(__dirname, "views"));//tells it to look for hbs files in views directory
app.engine('.hbs', exphbs({'extname': '.hbs'}));//already told engine that all files end with hbs
app.set('view engine', '.hbs');

app.get('/', function(req, res) {
  res.render('index', {
    a: 1,
    b: 2,
    c: 3
  });
});

app.listen(3000, function() {
  console.log("Server has connected on port", 3000);
});
