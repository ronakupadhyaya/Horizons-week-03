var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({
  extname: 'hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(req, res) {
  res.render('index', {
    data: data
  })
});

var male = data.filter(function(student) {
  return student.gender === 'Male'
});

app.get('/male', function(req, res) {
  res.render('index', {
    data: male
  })
});

var female = data.filter(function(student) {
  return student.gender === 'Female'
});

app.get('/female', function(req, res) {
  res.render('index', {
    data: female
  })
});

app.listen(3000);
console.log('Started');
