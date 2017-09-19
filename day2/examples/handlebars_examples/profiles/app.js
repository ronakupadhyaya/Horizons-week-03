var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
var maleData = [];
var femaleData = [];
data.forEach(function(element){
  if (element.gender === 'Male'){
    maleData.push(element);
  }
  else{
    femaleData.push(element);
  }
});
app.get('/', function(req, res){
  res.render('index', {
    datas: data
  });
});

app.get('/male', function(req, res){
  res.render('index', {
    datas: maleData
  });
});

app.get('/female', function(req, res){
  res.render('index', {
    datas: femaleData
  });
});

app.listen(3000);
console.log('Success');
