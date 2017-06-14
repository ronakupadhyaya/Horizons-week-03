var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('pros', {
    data: data,
    gender: data.gender
  });
});
app.get('/male', function(req, res) {
  var newdata = data.filter(function(item){
    return item.gender === "Male";
  })
  res.render('pros', {
    data: newdata
  });
});

app.get('/female', function(req, res) {
  var newdata = data.filter(function(item){
    return item.gender === "Female";
  })
  res.render('pros', {
    data: newdata
  });
});


app.listen(3000);
