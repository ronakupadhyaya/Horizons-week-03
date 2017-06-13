"use strict";

var express = require("express");
var fs = require('fs');


var app = express();
var handlebars = require('express-handlebars');

app.engine("hbs", handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs')

app.get('/', function(req, res) {
  res.render('template')
})
app.get('/:errorCode', function(req, res) {
  res.render('template', {
    theError: req.params.errorCode
  })
})
app.listen(3000);
console.log('server start');
