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
  res.render("index", {
    data: data
  });
});

var maleData = data.filter(function(line){
  return line.gender === "Male";
});

app.get("/male", function(req, res){
  res.render("index2", {
    maleData: maleData
  });
});

var femaleData = data.filter(function(line){
  return line.gender === "Female";
});

app.get("/female", function(req, res){
  res.render("index3", {
    femaleData: femaleData
  });
});


app.listen(3000);
