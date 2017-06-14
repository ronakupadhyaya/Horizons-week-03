var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');

app.engine('hbs', exphbs({
  extname: 'hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// A directory of all students
app.get('/', function(req, res) {
  res.render('index.hbs', {
    friends: data
  });
});

// A directory of all male students
app.get('/male', function(req, res) {
  // Do you logic in javascript and hand handlebar the correct data
  var dataMale = [];
  for (var friend = 0; friend < data.length; friend++) {
    if (data[friend].gender === "Male" ? true : false) {
      dataMale.push(data[friend]);
    }
  }
  res.render('index.hbs', {
    friends: dataMale
  });
});

// A directory of all female students
app.get('/female', function(req, res) {
  // Do you logic in javascript and hand handlebar the correct data
  var dataFemale = [];
  for (var friend = 0; friend < data.length; friend++) {
    if (data[friend].gender === "Female" ? true : false) {
      dataFemale.push(data[friend]);
    }
  }
  res.render('index.hbs', {
    friends: dataFemale
  });
});

app.listen(3000);
