var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/',function(req,res) {
  res.render('index', {
    students: data
  })
})

app.get('/male',function(req,res) {
  function isMale(student) {
    return student.gender === "Male"
  }
  var males = data.filter(isMale)

  res.render('index', {
    students: males
  })
})

app.get('/female',function(req,res) {
  function isFemale(student) {
    return student.gender === "Female"
  }
  var females = data.filter(isFemale)

  res.render('index', {
    students: females
  })
})

app.listen(3000);
