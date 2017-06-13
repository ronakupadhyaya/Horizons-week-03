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
    data: data,
    header: 'Student information:'
  })
})

app.get('/male', function(req, res){
  dataMale = [];
  data.forEach(function(item){
    if(item.gender === 'Male'){
      dataMale.push(item);
    }
  })
  res.render('index', {
    data: dataMale,
    header: 'Male student information:'
  })
})

app.get('/female', function(req, res){
  dataFemale = [];
  data.forEach(function(item){
    if(item.gender === 'Female'){
      dataFemale.push(item);
    }
  })
  res.render('index', {
    data: dataFemale,
    header: 'Female student information:'
  })
})

app.listen(3000);
