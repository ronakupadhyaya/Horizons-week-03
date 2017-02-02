var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({
  extname: '.hbs',
  helpers: {
    // You can define an Handlebars helper here
    // YOUR CODE HERE
    unitsHTMLGen: function(selected) {
      var ret = "";
      var units = ["days", "months", "years"];
      units.forEach(function(unit) {
        if (selected === unit) {
          ret += "<option selected>" + unit + "</option>";
        } else {
          ret += "<option>" + unit + "</option>";
        }
      });
      return ret;
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

app.get('/', function(req, res) {
  // YOUR CODE HERE
  console.log(req.query.when, req.query.amount, req.query.units, req.query.action);
  var current = new Date(req.query.when);
  console.log(toDateStr(current));
  var newDate = dateCalc(req.query.when, parseInt(req.query.amount), req.query.units, req.query.action);

  function dateCalc(dateStr, amount, units, action) {
    var date = new Date(dateStr);


    console.log("Original Date", date);
    if (units === "days") {
      if (action === "to the future!") {
        date.setDate(date.getDate() + amount + 1);
        console.log(date);
      }
      if (action === "to the past") {
        date.setDate(date.getDate() - amount + 1);
      }
    }
    if (units === "months") {
      if (action === "to the future!") {
        date.setMonth(date.getMonth() + amount);
        date.setDate(date.getDate() + 1);
      }
      if (action === "to the past") {
        date.setMonth(date.getMonth() - amount);
        date.setDate(date.getDate() + 1);
      }
    }
    if (units === "years") {
      if (action === "to the future!") {
        date.setFullYear(date.getFullYear() + amount);
        date.setDate(date.getDate() + 1);
      }
      if (action === "to the past") {
        date.setFullYear(date.getFullYear() - amount);
        date.setDate(date.getDate() + 1);
      }
    }
    return date;
  }


  console.log("NEW DATE", newDate);
  console.log(newDate);
  res.render('index', {
    when: toDateStr(newDate),
    amount: req.query.amount,
    units: req.query.units
  });

});

app.listen(3001);