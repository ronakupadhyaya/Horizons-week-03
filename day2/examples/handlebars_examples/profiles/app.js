var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('index', {
    arr: data
  });
});

app.get('/male', function(req, res){
  var arrMale = data.filter(function(help) {
    return help.gender === "Male";
  });
  res.render('index', {
    arr: arrMale
  });
});

app.get('/female', function(req, res){
  var arrFem = data.filter(function(help) {
    return help.gender === "Female";
  });
  res.render('index', {
    arr: arrFem
  });
});

app.listen(3000);
