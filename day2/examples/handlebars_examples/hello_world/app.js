"use strict";
var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
app.engine('hbs', handlebars ({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(request, response) {
  response.render('html_template');
});

app.get('/:error', function(request, response) {
  response.render('html_template', {
    error: request.params.error
  });
})

app.listen(3000);
