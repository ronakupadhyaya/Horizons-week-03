"use strict";

var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname:'hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('first');
});

app.get('/:error', function(req, res) {
  res.render('second', {
    name: req.params.error
  });
});

// app.get('/:word', function(req, res) {
//   var isEven = (req.params.word.length % 2 === 0 ? true : false);
//   res.render('condition', {word: req.params.word, isEven: isEven});
// });

app.listen(9000);
