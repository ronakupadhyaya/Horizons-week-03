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
var data = fs.readFileSync('data.json');
var students = JSON.parse(data);
var maleStudents = [];

for (var i = 0; i < students.length; i++) {
  if(students[i]['gender'] === "Male") {
    maleStudents.push(students[i]);
  }
}
var femaleStudents = [];
for (var i = 0; i < students.length; i++) {
  if(students[i]['gender'] === "Female") {
    femaleStudents.push(students[i]);
  }
}
// console.log(students);



app.get('/:', function(req, res) { //directory of All Students
  res.render('index', {
    students
  });
});

app.get('/male:', function(req, res) { //directory of MALE Students

  res.render('index', {
    maleStudents
  });
});

app.get('/female:', function(req, res) { //directory of FEMALE Students
  res.render('index', {
    femaleStudents
  });
});
app.listen(3000);
console.log("STARTED");
