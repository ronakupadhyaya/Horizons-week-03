var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
//for Male
var dataMale =  data.filter(function(line){
  return line['gender'] === 'Male';
})
var dataFemale =  data.filter(function(line){
  return line['gender'] === 'Female';
})

app.get('/male', function(req, res){
  res.render('index', {
    data : dataMale
  });
});

app.get('/female', function(req, res){
  res.render('index', {
    data : dataFemale
  });
});

//for ALL students
app.get('/', function(req, res){
  res.render('index', {
    data : data
  });
});

app.listen(3000);
console.log('running');
