var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var maleArr = data.filter( function(student) {return student.gender == "Male"});
var femaleArr = data.filter( function(student) {return student.gender == "Female"});

// YOUR CODE HERE
app.get('/', function(req, res){
  res.render('template', {data: data});
})


app.get('/:gender', function(req, res){
  if (req.params.gender === 'male'){
  res.render('template', {data: maleArr});
  }
  else {
    res.render('template', {data: femaleArr});
  }
})




app.listen(3000);
