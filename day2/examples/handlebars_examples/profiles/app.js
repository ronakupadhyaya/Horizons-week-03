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
var data = fs.readFileSync('./data.json', 'utf8');
data = JSON.parse(data);

app.get('/', function(req, res) {
  res.render('student_list', {
    data: data
  })
});

app.get('/male', function(req, res) {
  var male_data = [];
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].gender);
    if (data[i].gender === 'Male') {
      male_data.push(data[i]);
    }
  }
  res.render('student_list', {
    data: male_data
  });
});

app.get('/female', function(req, res) {
  var female_data = [];
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].gender);
    if (data[i].gender === 'Female') {
      female_data.push(data[i]);
    }
  }
  res.render('student_list', {
    data: female_data
  });
});

app.listen(3000);



