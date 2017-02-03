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
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate() + 1);
}

app.get('/', function(req, res) {
  // YOUR CODE HERE
  console.log(req.query.action);
  var inputs = req.query
  var date = new Date(inputs.when);
  var amount = req.query.amount;
  if (req.query.action === "to the past") {
    amount = -amount;
  }

  if (inputs.units === 'days'){
    date.setDate(date.getDate() + parseInt(amount))
  } else if (inputs.units === 'months'){
      date.setMonth(date.getMonth() + parseInt(amount))
  } else if (inputs.units === 'years'){
      date.setFullYear(date.getFullYear() + parseInt(amount))
  }

  date = toDateStr(date);


  res.render('index', {
    date: date,
    amount: inputs.amount});
});

app.listen(3000);
