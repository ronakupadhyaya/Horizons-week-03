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
      selectDefault: function(units) {
        var ret='';
        arr=['days', 'months', 'years'];
        for(var i = 0; i < arr.length; i++){
          if(arr[i] === units)
            ret +=`<option selected>${arr[i]}</option>`;
          else
            ret +=`<option>${arr[i]}</option>`;
        }
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
  return date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate());
}

app.get('/', function(req, res) {
  // YOUR CODE HERE
  // console.log(req.query.when);
  // console.log(req.query.amount);
  // console.log(req.query.units);
  // console.log(new Date(req.query.when).getUTCDate());
  // console.log("action:",req.query.action);
  var curDate = new Date(req.query.when);

  console.log(curDate);

  // to+the+future
  if(req.query.action === "to the future!")
  {
    if(req.query.units === "days"){
      curDate.setUTCDate(curDate.getUTCDate() + parseInt(req.query.amount));
    }
    else if (req.query.units === "months"){
      curDate.setUTCMonth(curDate.getUTCMonth() + parseInt(req.query.amount));
    }
    else if (req.query.units === "years"){
      curDate.setUTCFullYear(curDate.getUTCFullYear() + parseInt(req.query.amount));
    }
  }
  else if(req.query.action === "to the past"){
    if(req.query.units === "days"){
      curDate.setUTCDate(curDate.getUTCDate() - parseInt(req.query.amount));
    }
    else if (req.query.units === "months"){
      curDate.setUTCMonth(curDate.getUTCMonth() - parseInt(req.query.amount));
    }
    else if (req.query.units === "years"){
      curDate.setUTCFullYear(curDate.getUTCFullYear() - parseInt(req.query.amount));
    }
  }
  console.log(curDate);
  res.render('index', {when: toDateStr(curDate),
                      amount: req.query.amount,
                      units: req.query.units});
});

app.listen(3000);
