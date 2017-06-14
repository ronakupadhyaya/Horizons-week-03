"use strict"

var express = require('express');
var handlebars = require('express-handlebars');

var app = express();

app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use('/:error', function(req, res) {
  res.render('error', {
    link: req.params.error
  })
});

app.use('/', function(req, res) {
  res.render('helloWorld')
});

app.listen(3000);
