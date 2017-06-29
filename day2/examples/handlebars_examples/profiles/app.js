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
    students: data
  })
})

app.get('/male', function(req, res) {
  var maleData = data.filter(function(item) {
    return item.gender === 'Male';
  })
  res.render('index', {
    students: maleData
  })
})

app.get('/female', function(req, res) {
  var femaleData = data.filter(function(item) {
    return item.gender === 'Female';
  })
  res.render('index', {
    students: femaleData
  })
})

app.listen(3000);