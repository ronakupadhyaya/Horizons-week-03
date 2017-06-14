var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var fs = require('fs');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



var females = [];
var males = [];
for(var i = 0; i < data.length; i++){
  if(data[i].gender === "Male"){
    males.push(data[i])
  }else if(data[i].gender === "Female"){
    females.push(data[i])
  }
}

// YOUR CODE HERE
app.get('/', function(request, response) {
  response.render('index', {word: "all students", people:data})
});

app.get('/male', function(request, response) {
    response.render('index', {word: "male", people: males})
});

app.get('/female', function(request, response) {
    response.render('index', {word: "female", people: females})
});

app.listen(3000);
