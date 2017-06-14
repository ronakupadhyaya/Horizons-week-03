var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//gets directory of all students
app.get('/', function(req,res){
  res.render('index',{
    students: data//how to pull data.json stuff
  })
})

//gets directory of all male students
app.get('/male', function(req,res){
  var maleList = data.filter(function(student){
    return student.gender === 'Male';
  })
  res.render('index', {
    students: maleList
  })
})

//gets directory of all female students
app.get('/female', function(req,res){
  var femaleList = data.filter(function(student){
    return student.gender === 'Female';
  })
  res.render('index', {
    students: femaleList
  })
})


app.listen(3000);
