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
      water: function(options, selectedOption) {
        var ret = ''
        for (var i = 0; i < options.length; i++) {
          if (selectedOption === options[i]) {
            ret += '<option selected>' + options[i] + '</options>'
          } else {
            ret += '<option>' + options[i] + '</options>'
          }
        }
        return ret;
      }
    }
  }));
app.set('view engine', '.hbs');

function pad(num) {
  var norm = Math.abs(Math.floor(num));
  return (norm < 10 ? '0' : '') + norm;
};

// This function
function toDateStr(date) {
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
};
app.get('/', function(req, res) {
  var timeControl = req.query.when;
  var timeAmount = parseInt(req.query.amount)
  if (req.query.action === 'to the past') {
    timeAmount = -timeAmount
  }
  var result = new Date(timeControl)
  if (req.query.units === 'days') {
    result.setDate(result.getDate() + timeAmount + 1);
  };
  if (req.query.units === 'months') {
    result.setMonth(result.getMonth() + timeAmount);
    result.setDate(result.getDate() + 1);
  };
  if (req.query.units === 'years') {
    result.setFullYear(result.getFullYear() + timeAmount);
    result.setDate(result.getDate() + 1);
  };
  timeControl = toDateStr(result);

  var options = ['days', 'months', 'years']

  res.render('index', {
    when: timeControl,
    amount: req.query.amount,
    options: options,
    units: req.query.units
  });
});

app.listen(3000);
