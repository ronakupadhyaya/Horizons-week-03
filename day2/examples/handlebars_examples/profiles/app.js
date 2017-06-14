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
    data: data
  });
})

app.get('/male', function(req, res) {
  var male = [];
  data.forEach(function(d) {
    if (d.gender === "Male") {
      male.push(d);
    }
  })
  res.render('index', {
    data: male
  });
})

app.get('/female', function(req, res) {
  var female = [];
  data.forEach(function(d) {
    if (d.gender === "Female") {
      female.push(d);
    }
  })
  res.render('index', {
    data: female
  });
})

app.listen(3000);
