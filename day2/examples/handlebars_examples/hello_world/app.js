"use strict";
var express = require("express");
var app = express();

var handlebars = require("express-handlebars");
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('helloWorld');
});

app.get('/:error', function(req, res) {
  res.send(req.params.error + " page not found, did you enter the correct url?");
});

app.listen(3000);
console.log('started');
