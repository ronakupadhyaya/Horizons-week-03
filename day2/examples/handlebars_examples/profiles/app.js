var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(request, response) {
  response.render('index', {
    data: data
  });

  app.get('/male', function(request, response) {
    response.render('index', {
      data: data
    });

    app.get('/female', function(request, response) {
      response.render('index', {
        data: data
      });

      
});
app.listen(3000);
