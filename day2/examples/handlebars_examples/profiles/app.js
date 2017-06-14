var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('template', {
    students: data
  })
})

// app.get('/male', function(req, res) {
//   var maleStudent = [];
//   data.forEach(function(student) {
//     if(student.gender === "Male") {
//       maleStudent.push(student);
//     }
//   })
//   res.render('template', {
//     students: maleStudent
//   })
// })
//
// app.get('/female', function(req, res) {
//   var femaleStudent = [];
//   data.forEach(function(student) {
//     if(student.gender === "Female") {
//       femaleStudent.push(student);
//     }
//   })
//   res.render('template', {
//     students: femaleStudent
//   })
// })

//query
app.get('/:gender', function(req, res) {
  var newData = [];
  var gender = req.params.gender;
  data.forEach(function(student) {
    if(student.gender.toLowerCase() === gender.toLowerCase()) {
      newData.push(student);
    }
  })
  res.render('template', {
    students: newData
  })
})

app.listen(3000);
