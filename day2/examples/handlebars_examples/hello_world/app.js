"use strict";
var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  var text = 'Hello world';
  res.render('template', {
    vari: text
  })
})

app.get('/:error', function(req, res){
  var text = req.params.error + ' page not found. Is the URL correct?';
  res.render('template', {
    vari: text
  })
})



app.listen(3000);
