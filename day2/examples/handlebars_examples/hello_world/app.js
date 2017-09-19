"use strict";
var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('myFirstTemplate');
});

app.get('/:any', function(req, res){
  //res.send('&lt;' + req.params.any + '&gt; page not found, did you enter the correct url?');
  var error = req.params.any;
  res.render('error', {
    errorName: error
  });
});

app.listen(3001);
console.log('Started');
