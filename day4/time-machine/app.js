var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs(
  {
    extname: '.hbs',
    helpers: {
      keepUnit: function() {
        if (u === 'days') {
          return `<option selected name="days">days</option>
                  <option name="months">months</option>
                  <option name="years">years</option>`
        } else if (u === 'months') {
          return `<option name="days">days</option>
                  <option selected name="months">months</option>
                  <option name="years">years</option>`
        }
        else if (u === 'years') {
          return `<option name="days">days</option>
                  <option name="months">months</option>
                  <option selected name="years">years</option>`
        }
      }
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

function incrementDate(date, period, amount) {
  if (period === 'days') {
    var poop = date.setDate(date.getUTCDate() + amount);
      return new Date(poop);
  } else if (period === 'months') {
    var poop = date.setMonth(date.getUTCMonth() + amount);
      return new Date(poop);
  } else if (period === 'years') {
    var poop = date.setFullYear(date.getUTCFullYear() + amount);
      return new Date(poop);
  }
}

function decrementDate(date, period, amount) {
  if (period === 'days') {
    var poop = date.setDate(date.getUTCDate() - amount);
      return new Date(poop);
  } else if (period === 'months') {
    var poop = date.setMonth(date.getUTCMonth() - amount);
      return new Date(poop);
  } else if (period === 'years') {
    var poop = date.setFullYear(date.getUTCFullYear() - amount);
      return new Date(poop);
  }
}

var u;


app.get('/', function(req, res) {
  var amt = req.query.amount;
  var too = parseInt(req.query.amount);
  u = req.query.units;
  var given = new Date(req.query.when);
  var newDate;
  var currentDate = new Date();

  if (req.query.action === 'to the future!') {
    newDate = incrementDate(given, req.query.units, too);
    currentDate = toDateStr(newDate);
  } else {
    newDate = decrementDate(given, req.query.units, too);
    currentDate = toDateStr(newDate);
  }
  res.render('index', {
    when: currentDate,
    amount: amt

  });
});

app.listen(3000);
