var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
var females = data.filter(function(person) {
  return person.gender === "Female";
});

var males = data.filter(function(person) {
  return person.gender === "Male";
});

app.get('/', function(req, res) {
  res.render('index', {
    students: data,
    title: 'All students:'
  });
});

app.get('/female', function(req, res) {
  res.render('index', {
    students: females,
    title: 'Female students:'
  });
});

app.get('/male', function(req, res) {
  res.render('index', {
    students: males,
    title: 'Male students:'
  });
});

app.listen(3000);
