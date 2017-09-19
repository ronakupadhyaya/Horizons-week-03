var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE

app.get("/", function(req, res){
  res.render("index.hbs", {
    students : data
  })
})

app.get("/male", function(req, res){
  var males = [];
  data.forEach(function(elem){
    if (elem.gender === "Male"){
      males.push(elem);
    }
  });
  res.render("index.hbs", {
    students : males
  })
})

app.get("/female", function(req, res){
  var females = [];
  data.forEach(function(elem){
    if (elem.gender === "Female"){
      females.push(elem);
    }
  });
  res.render("index.hbs", {
    students : females
  })
})

app.listen(3000);
