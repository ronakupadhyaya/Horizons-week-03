 var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs(
  {
    extname: '.hbs',
    helpers: {
      // You can define an Handlebars helper here
      // YOUR CODE HERE
    }
  }));
app.set('view engine', '.hbs');

function pad(num) {
  var norm = Math.abs(Math.floor(num));
  return (norm < 10 ? '0' : '') + norm;
}

// This function
function toDateStr(date) {
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}

app.get('/', function(req, res) {
  // YOUR CODE HERE
  var unitsArray = ['days', 'months', 'years'];
  var selected = req.query.units;
  if(selected) {
    unitsArray.splice(unitsArray.indexOf(selected), 1);
  }
  res.render('index', {
    date: req.query.when,
    number: req.query.amount,
    unitsArray: unitsArray,
    selectedUnit: selected
  });
});

app.listen(3000);
