var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var _ = require('underscore');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/',function(req,res){
  res.render('index',{
    arr: data
  })
})

app.get('/male',function(req,res){
  data = _.filter(data,function(item){
      return item.gender === 'Male'})
  res.render('index',{
    arr: data
  })
})
app.get('/female',function(req,res){
  data = _.filter(data,function(item){
      return item.gender === 'Female'})
  res.render('index',{
    arr: data
  })
})

app.listen(3000);
