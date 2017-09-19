var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data.json');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

console.log(data);
app.get('/', function(req, res){
  res.render('index', {person: data})
});
app.get('/male', function(req, res){
  var male = data.filter(function(person){
    return person.gender==="Male";
  })
  res.render('index', {person: male})
});
app.get('/female', function(req, res){
  var female = data.filter(function(person){
    return person.gender==="Female";
  })
  res.render('index', {person: female})
});


app.listen(3000);
