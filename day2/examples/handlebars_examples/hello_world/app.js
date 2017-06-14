"use strict";
var express = require('express');
var app = express();

var handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs')

//rendering from helloworld
app.get('/', function(req,res) {
  res.render('helloworld', {
  })
})

//for error
app.get('/:error', function(req,res) {
  res.send(req.params.error + " not found, did you enter the correct url?")
})

app.listen(3000);
console.log('started')
