var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var underscore = require('underscore-node');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/male', function(req, res) {
  var males = underscore.filter(data, function(ele) {
    if (ele.gender === "Male") {
      return true;
    } else {
      return false;
    }
  })
  res.render('index', {data:males})
});

app.get('/female', function(req, res) {
  var females = underscore.filter(data, function(ele) {
    if (ele.gender === "Female") {
      return true;
    } else {
      return false;
    }
  })
  res.render('index', {data:females})
});

app.get('/', function(req, res) {
  res.render('index', {data:data})
});
app.listen(3000);
