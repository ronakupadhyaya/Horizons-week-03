var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(req, res) {
  res.render('index', {
    students: data,
  });
});

var male = data.filter(function(student){
  return student.gender === 'Male'
})

var female = data.filter(function(student){
  return student.gender === 'Female'
})

app.get('/male', function(req, res) {
  res.render('male', {
    students: male,
  });
});

app.get('/female', function(req, res) {
  res.render('female', {
    students: female,
  });
});

app.listen(3000);
