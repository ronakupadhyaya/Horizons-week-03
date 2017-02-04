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
  var when = req.query.when;
  var date = new Date(when);
  var amount = parseInt(req.query.amount);
  if(req.query.whichButton === 'to the past') {
    amount = -amount;
  }
if (req.query.units === 'days') {
  date.setDate(date.getDate() + amount)
} else if (req.query.units === 'months') {
  date.setMonth(date.getMonth() + parseInt(amount))
} else if (req.query.units === 'years') {
  date,setFullYear(date.getFullYear() + parseInt(amount));
}

  var time = ["days", "months", "years"];
  var selected = req.query.units;
  if(selected) {
    time.splice(time.indexOf(selected),1);
  }


  res.render('index', {
    date: toDateStr(date),
    number: req.query.amount,
    time: time,
    first: selected,
  });
});

// app.post('/'), function(req, res) {
//   res.render('index', {date: toDateStr(req.body.when))
// }

app.listen(3000);
