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
      //what is a handlebar helper lol
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
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate() + 1);
}

app.get('/', function(req, res) {
  // YOUR CODE HERE
  var when = req.query.when;
  var date = new Date(when);
  var amount = parseInt(req.query.amount)
  if (req.query.whichButton === "to the past!") {
    amount = -amount;
      if (req.query.units === "days") {
        date.setDate(date.getDate() + amount);
      }
      else if (req.query.units === "months") {
        date.setDate(date.getMonth() + amount);
      }
      else if (req.query.units === "years") {
        date.setDate(date.getYear() + amount);
      }
    }

  res.render('index', {
    time: toDateStr(date),
    stuff: req.query.amount,
    daysselected: (req.query.units === 'days') ? 'selected' : '',
    monthsselected: (req.query.units === 'months') ? 'selected' : '',
    yearsselected: (req.query.units === 'years') ? 'selected' : ''
  })
});

app.listen(3000);
