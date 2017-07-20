var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(req, res){
  res.render('index', {
  all: data
  }
)});
var femaleArr = data.filter(function(item){
    return item.gender === 'Female'
  })
  var maleArr = data.filter(function(item){
      return item.gender === 'Male'
    })
app.get('/female', function(req, res){

  res.render('index', {

  all: femaleArr
  }
)});
app.get('/male', function(req, res){

  res.render('index', {

  all: maleArr
  }
)});

app.listen(3000);
