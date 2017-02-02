var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs(
  {
    extname: '.hbs',
    helpers: {
      // YOUR CODE HERE
      select: function(selectedOption) {
        var options = ['days', 'months', 'years'];
        return options.map(function(option) {
          var selected = selectedOption === option ? 'selected' : '';
          return `<option ${selected}>${option}</option>`
        }).join('');
      }
    }
  }));
app.set('view engine', '.hbs');

function pad(num) {
  var norm = Math.abs(Math.floor(num));
  return (norm < 10 ? '0' : '') + norm;
}

function toDateStr(date) {
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate() + 1);
}

app.get('/', function(req, res) {
  // YOUR CODE HERE
  var when = new Date(req.query.when);
  var amount = parseInt(req.query.amount) || 0;

  var combine;
  if (req.query.action === 'to the future!') {
    combine = function(a, b) { return a + b; }
  } else {
    combine = function(a, b) { return a - b; }
  }

  if (req.query.units === 'days') {
    when.setDate(combine(when.getDate(), amount));
  } else if (req.query.units === 'months') {
    when.setMonth(combine(when.getMonth(), amount));
  } else if (req.query.units === 'years') {
    when.setFullYear(combine(when.getFullYear(), amount));
  }
  console.log(when);
  res.render('index', {
    when: toDateStr(when),
    amount: amount,
    units: req.query.units
  });
});

app.listen(3000);
