"use strict";

var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/:error', function(req, res) {
  var name = req.params.error
  res.render('myFirstTemplate', {
    errorName: name
  });
});

app.listen(3000);
console.log('Started');
