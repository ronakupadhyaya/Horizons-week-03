var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get("/", function(req, res) {
  res.render("index", {
    data: data
  });
});


app.get("/female", function(req, res) {
  data = data.filter(function(i){
    return i.gender === "Female";
  });
  res.render("index", {
    data: data
  });
});

app.get("/male", function(req, res) {
  data = data.filter(function(i){
    return i.gender === "Male";
  });
  res.render("index", {
    data: data
  });
});

app.listen(3000);
