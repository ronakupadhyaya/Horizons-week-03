var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs(
  {
    extname: '.hbs',
    helpers: {

      makeDropdown: function(selected) {
        var options = ["days", "months", "years"];
        var rendered = "";
        for (var i = 0; i < options.length; i++) {
          rendered += "<option ";
          if (selected === options[i]) rendered += "selected";
          rendered += ">" + options[i] + "</option>\n"
        }
        return rendered;
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

function sum(a,b) { return a + b}
function diff(a,b) { return a - b}
function combine(fn, a, b) { return fn(a,b) }

function leapThroughTime(date, amount, units, dirFn) {
  var dateDate = new Date(date);
  if (units === "days") {
    dateDate.setDate(combine(dirFn,dateDate.getDate(),parseInt(amount)))
  } else if (units === "months") {
    dateDate.setMonth(combine(dirFn,dateDate.getMonth(),parseInt(amount)))
  } else if (units === "years") {
    dateDate.setFullYear(combine(dirFn,dateDate.getFullYear(),parseInt(amount)))
  }
  return toDateStr(dateDate);
}

app.get('/', function(req, res) {
  var date = req.query.when || toDateStr(new Date());
  var amount = req.query.amount || "0";
  var units = req.query.units || "days";
  var action = req.query.action || "";

  dirFn = action.includes('uture') ? sum : diff;
  date = leapThroughTime(date, amount, units, dirFn);

  res.render('index', {when: date, amount: amount, units: units});
});

app.listen(3000);
