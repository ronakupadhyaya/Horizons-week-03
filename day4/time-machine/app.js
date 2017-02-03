var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs(
  {
    extname: '.hbs',
    helpers: {
      dateUp: function(n) {
        var ret = "<select name='units'>";
        var arr = ['days', 'months', 'years'];
        arr.forEach(function(item) {
          ret += '<option';
          if (item === n) {
            ret += 'selected';
          }
          ret += '>';
          ret += item;
          ret += '</option>';
        })
        ret += '</select>';
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
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate() + 1);
}

app.get('/', function(req, res) {
  // YOUR CODE HERE
  var date = new Date(req.query.when);
  var number = parseInt(req.query.amount);
  if (req.query.action = "to the future!") {
    if (req.query.units === 'days') {
      date.setDate(date.getDate() + number);
    } else if (req.query.units === 'months') {
      date.setDate(date.getMonth() + number);
    } else if (req.query.units === 'years') {
      date.setDate(date.getFullYear() + number);
    }
  } else {
    if (req.query.units === 'days') {
      date.setDate(date.getDate() - number);
    } else if (req.query.units === 'months') {
      date.setDate(date.getMonth() - number);
    } else if (req.query.units === 'years') {
      date.setDate(date.getFullYear() - number);
    }
  }
  console.log(date, 'NEW DATE');
  res.render('index', {
    date: toDateStr(date),
    selected: req.query.units
  });
});

app.listen(3000);
