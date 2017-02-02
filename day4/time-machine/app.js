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
      datetime: when.toDateStr();
    }
    name: param.query.amount;
  }));
app.set('view engine', '.hbs');

function pad(num) {
  var norm = Math.abs(Math.floor(num));
  return (norm < 10 ? '0' : '') + norm;
}

// This function
function toDateStr(date) {
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()+1);
}

app.get('/', function(req, res) {
  // YOUR CODE HERE
  var when = req.query.when;
  // parse the date
  var date = new Date(when);

  // prevent copied CODE
  var amount = parseInt(req.query.amount);

  if (req.query.action === 'to the future!'){
    amount = amount;
  }else{
    amount = -amount;
  }

  if (req.query.units === 'days'){
    // parse int because we get stuff as str from browser
    date.setDate(date.getDate() + amount);
  } else if (req.query.units ==== 'months'){
    date.setMonth(date.getMonth() + amount)
  } else if (req.query.units ==== 'years'){
    date.setFullYear(date.getFullYear() + amount)
  }

  res.render('index',{
    // turn time back to string
    time: toDateStr(date),
    howMuch: req.query.amount

  });
});

app.listen(3000);
