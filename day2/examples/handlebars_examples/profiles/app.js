var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var fs = require('fs');
var data = fs.readFileSync('data.json');
var students = JSON.parse(data);
var students_male = [];

app.get('/', function(req,res){
  res.render('index', {
    students: students
  });
});

for(var i =0; i< students.length; i++){
  if(students['gender'] === 'Male'){
    students_male.push(students[i])
  }
}

app.get('/male', function(req,res){
  res.render('index', {
    students_male
  })
})


app.listen(3000);
