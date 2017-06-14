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

// YOUR CODE HERE
app.get('/', function (req, res) {
  res.render("index", {
    data: data
  })
});

var manArray = data.filter(function (n) {
  return n.gender === 'Male';
});
var womanArray = data.filter(function (n) {
  return n.gender === 'Female';
});

app.get('/:name', function (req, res) {
  if (req.params.name === "female") {
    res.render("index", {
      data: womanArray
    });
  } else {
    res.render("index", {
      data: manArray
    });
  }
});

app.listen(3000);
