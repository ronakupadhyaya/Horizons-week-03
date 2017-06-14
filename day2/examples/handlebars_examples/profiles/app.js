var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('index.hbs', {array: data})
})

app.get('/male', function(req, res){
  var temp = [];
  data.forEach(function(item){
    if(item["gender"] === 'Male'){
      temp.push(item);
    }
  })
  res.render('index.hbs', {array: temp});
})

app.get('/female', function(req, res){
  var temp = [];
  data.forEach(function(item){
    if(item.gender === 'Female'){
      temp.push(item);
    }
  })
  res.render('index.hbs', {array: temp});
})

app.listen(3000);
