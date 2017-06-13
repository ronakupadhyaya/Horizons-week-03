var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('index', {
    data: data
  })
})
app.get('/male', function(req, res) {
  var newData = getNewData(data, 'Male')
  res.render('index', {
    data: newData
  })
})
app.get('/female', function(req, res) {
  var newData = getNewData(data, 'Female')
  res.render('index', {
    data: newData
  })
})
app.listen(3000);
console.log('started')

function getNewData(data, gend) {
  var typeGend = [];
  data.forEach(function(stud) {
    if (stud.gender === gend){
      typeGend.push(stud)
    }
  })
  return typeGend
}
