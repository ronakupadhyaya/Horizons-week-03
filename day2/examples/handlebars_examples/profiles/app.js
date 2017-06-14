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
    people: data,
  })
})

app.get('/:gender', function(req, res) {
  res.render('index', {
    gender: req.params.gender,
    people: data
  })
})

app.listen(3000);

var a = 10
setInterval(function(){
  console.log("running...", a, " seconds");
  a += 10
}, 10000)
