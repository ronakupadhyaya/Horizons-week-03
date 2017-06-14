var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var maleArr =[];
var femaleArr = [];
data.forEach(function(person) {
  if (person.gender === "Female") {
    femaleArr.push(person);
  } else {maleArr.push(person)}
})
// YOUR CODE HERE
app.get('/', function(req, res) {
  var allstudents = 'All students';
  // var students;
  res.render('template', {
    students: data
  })
})

app.get('/male', function(req, res) {
  var malestudents = 'All male students'

  res.render('template', {
    males: maleArr
  })
})

app.get('/female', function(req, res) {
  var femalestudent = 'All female students'

  res.render('template', {
    females: femaleArr
  })
})

app.listen(3000);
