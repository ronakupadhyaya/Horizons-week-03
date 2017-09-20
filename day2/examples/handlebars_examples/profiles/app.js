var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(request, response) {
  response.render('index', {profiles:data})
});

app.get('/male', function(request, response) {
  var males = data.filter(function(person){
    return person.gender === 'Male'
  })
  response.render('index', {profiles:males})
});

app.get('/female', function(request, response) {
  var females = data.filter(function(person) {
    return person.gender === 'Female'
  })
  response.render('index', {profiles:females})
});

app.listen(3000);
