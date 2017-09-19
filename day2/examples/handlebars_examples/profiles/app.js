var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
var fs = require('fs');

var studentArr = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
console.log(studentArr);

app.get('/', function(req, res){
  res.render('index', {
    students: studentArr
  });
})

app.get('/male', function(req, res){
  res.render('index', {
    students: studentArr.filter(function(student){
      return student.gender === 'Male';
    })
  });
})

app.get('/female', function(req, res){
  res.render('index', {
    students: studentArr.filter(function(student){
      return student.gender === 'Female';
    })
  });
})


app.listen(3000);
