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

app.get('/', function(req, res) {
  var dataset = data;
  dataset.forEach(function(ele) {
    ele["genderboolean"] = true
  })
  res.render('index', {
    data: dataset
  })
})
app.get('/male', function(req, res) {
  var datamen = data;
  datamen.forEach(function(ele) {
    ele['genderboolean'] = "Male" === ele.gender
  })
  res.render('index', {
    data: datamen,
  })
})
app.get('/female', function(req, res) {
  var datawomen = data;
  datawomen.forEach(function(ele) {
    ele['genderboolean'] = "Female" === ele.gender
  })
  res.render('index', {
    data: datawomen,
  })
})

app.listen(3000);
