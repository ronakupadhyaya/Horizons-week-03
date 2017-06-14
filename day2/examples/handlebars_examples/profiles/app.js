var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data.json');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(req, res) {
  
  var students = mapper(data);
  res.render('student', {
    studentData: students
  })
})

app.get('/female', function(req, res) {
  var students = mapper(data).filter(function(n) {
    return n.gender === 'Female';
  });
  res.render('student', {
    studentData: students
  })
})

app.get('/male', function(req, res) {
  var students = mapper(data).filter(function(n) {
    return n.gender === 'Male';
  });
  res.render('student', {
    studentData: students
  })
})

app.listen(3000,function() {
  console.log("running, 3000");
});

function mapper(students) {
  var newStudents =[];
  students.forEach(function(n) {
    newStudents.push({
      firstName: n.first_name,
      lastName: n.last_name,
      email: n.email,
      gender: n.gender
    })
  });
  return newStudents;
}