"use strict";

var express = require('express');
var app = express();

var handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
  extname = '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/greet', function(req, res) {
  var name = req.query.name || 'mysterious stranger';
  res.render('myFirstTemplate', {
    greetingName: name

  });
});

app.listen(3000);
