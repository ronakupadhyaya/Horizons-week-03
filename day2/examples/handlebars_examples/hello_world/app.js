"use strict";
var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', function(req, res){
  var greet = "Hello World";
  res.render('Template', {
    somethingHere: greet
  });
})



app.get('/:error', function(req, res){
  var err = req.params.error;
  res.render('Template', {
    someError: err
  });
})


app.listen(3000);
console.log("Started");
