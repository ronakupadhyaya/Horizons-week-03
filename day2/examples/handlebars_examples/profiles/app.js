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
    student: data
  });
});

app.get("/:gender", function(req, res) {
  var student = data.filter(s => s.gender.toLowerCase() === req.params.gender.toLowerCase());
  res.render("index", {
    student: student
  });
});

app.listen(3000);
