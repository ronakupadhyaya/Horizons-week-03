"use strict"
var express = require('express');

// Let's create a new express app
var app = express();
var handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', function(request, response) {
  response.render('myFirstTemplate');
});

app.get('/:error', function(request, response) {
  var errorName = request.params.error;
  response.render('mySecondTemplate', {
    error: errorName
  });
});

// app.get('/:error', function(request, response) {
//   respnse.render('myFirstTemplate')
// });

app.listen(3000);
