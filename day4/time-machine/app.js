var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs(
  {
    extname: '.hbs',
    helpers: {
      water: function (options, selectedOption) {
        var ret = '';
        for (var i = 0; i<options.length; i++) {
          if (selectedOption === options[i]) {
            ret +=
          }
        }
      }
    }
  }));
app.set('view engine', '.hbs');
var options = ['days','months', 'years']
function pad(num) {
  var norm = Math.abs(Math.floor(num));
  return (norm < 10 ? '0' : '') + norm;
}

// This function
function toDateStr(date) {
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()+1);
}

app.get('/', function(req, res) {
  if(req.query.action === "to the future!") {
    var d = new Date(req.query.when);
    if (req.query.units ==='days') {
      d.setDate(d.getDate()+parseInt(req.query.amount))
    }
    else if (req.query.units === 'months') {
      d.setMonth(d.getMonth()+parseInt(req.query.amount))
    }
    else {
      d.setFullYear(d.getFullYear()+parseInt(req.query.amount))
    }

    // datenew = new Date(datenew);
    // datenew= datenew.slice(0,10);
    // console.log(datenew)
  } else {
    var d = new Date(req.query.when);
    if (req.query.units ==='days') {
      d.setDate(d.getDate()-parseInt(req.query.amount))
    }
    else if (req.query.units === 'months') {
      d.setMonth(d.getMonth()-parseInt(req.query.amount))
    }
    else {
      d.setFullYear(d.getFullYear()-parseInt(req.query.amount))
    }
  }
  res.render('index', {time: toDateStr(d), amount: req.query.amount});
});

app.listen(3000);
