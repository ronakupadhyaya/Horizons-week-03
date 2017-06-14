"use strict";

var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
app.engine('hbs', exphbs({
  'extname': 'hbs'
}));
app.set('view engine', 'hbs');

var counter = 0;
app.get('/', function(req, res) {
  counter++;
  res.render('index.hbs', {
    counter: counter
  });
});

app.listen(3000, function() {
  console.log('Running on port 3000!');
});
