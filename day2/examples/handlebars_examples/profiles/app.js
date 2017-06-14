var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('index', {students: data});
});

app.get('/male', function(req, res){
  var male = [];
  data.forEach(function(a){
    if(a.gender === "Male"){
      male.push(a);
    }
  });
  res.render('index', {students: male});
});

app.get('/female', function(req, res){
  var female = [];
  data.forEach(function(a){
    if(a.gender === "Female"){
      female.push(a);
    }
  });
  res.render('index', {students: female});
});

app.listen(3000);
