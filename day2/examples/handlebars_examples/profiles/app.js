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
  res.render('template', {
    data: data
  });
})

var maleStudents = [], femaleStudents = [];
data.forEach(function(item){
  if(item.gender === 'Male'){
    maleStudents.push(item);
  }
  else{
    femaleStudents.push(item);
  }
})

app.get('/:gender', function(req, res){
  var isMale = req.params.gender === 'male' ? true: false;
  var isFemale = req.params.gender === 'female' ? true: false;
  res.render('template', {
    data: data,
    maleStudents: maleStudents,
    femaleStudents: femaleStudents,
    gender: req.params.gender
  });
})

app.listen(3000);
