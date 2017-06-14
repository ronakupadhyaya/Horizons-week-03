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
var male_students = [];
var female_students = [];
for (var i = 0; i < students.length; i++) {
  if (students[i]["gender"] === "Male") {
    male_students.push(students[i]);
  }
}
for (var i = 0; i < students.length; i++) {
  if (students[i]["gender"] === "Female") {
    female_students.push(students[i]);
  }
}

// YOUR CODE HERE
app.get('/', function(request, response) {
  response.render('index', {
    students
  });
});

app.get('/male', function(request, response) {
  response.render('index', {
    male_students
  });
});

app.get('/female', function(request, response) {
  response.render('index', {
    female_students
  });
});

app.listen(3000);
