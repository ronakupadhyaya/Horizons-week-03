var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function (req, res){
  res.render('index.hbs',{
    data: data
  })
});

app.get('/male', function (req,res){
  var maleArr = data.filter(function(a){
    return a.gender ==='Male'
  })
  res.render('index.hbs',{
  data: maleArr
  })
});

app.get('/female', function (req,res){
  var femArr = data.filter(function(a){
    return a.gender ==='Female'
    })
  res.render('index.hbs',{
  data: femArr
  })
});

app.listen(3000);
