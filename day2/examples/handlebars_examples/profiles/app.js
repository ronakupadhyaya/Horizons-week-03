var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(req, res){
  res.render('index', {
    students: data
  });
});
var males = [];
var females = [];
for (var i =0; i < data.length; i++) {
  if (data[i].gender === "Male") {
    males.push(data[i]);
  } else {
    females.push(data[i]);
  }
}
app.get('/male', function(req, res){
  res.render('index', {
    students: males
  });
});

app.get('/female', function(req, res){
  res.render('index', {
    students: females
  });
});


app.listen(3000);
