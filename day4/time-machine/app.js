var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs(
  {
    extname: '.hbs',
    helpers: {
      water: function(options, selectedOption) {
        var ret = '';
        for(var i = 0; i < options.length; i++) {
          if(selectedOption === options[i]) {
            ret += '<option selected>' + options[i] + '</option>'
          } else {
            ret += '<option>' + options[i] + '</option>'
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
  }

  // This function
  function toDateStr(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }

  app.get('/', function(req, res) {
    // YOUR CODE HERE
    var myDate = new Date(req.query.when);
    console.log('initial date')
    console.log(myDate);
    console.log('MY UTC DATE')
    console.log(myDate.getUTCDate())
    console.log('my amount')
    console.log(req.query.amount)

    if(req.query.action === 'to the future!') {
      if(req.query.units === 'days') {
        myDate.setUTCDate(myDate.getUTCDate() + parseInt(req.query.amount))
        console.log('days')
        console.log(myDate)
      }
      if(req.query.units === 'months') {
        myDate.setUTCMonth(myDate.getUTCMonth() + parseInt(req.query.amount))
        console.log('months')
        console.log(myDate)
      }
      if(req.query.units === 'years') {
        myDate.setFullYear(myDate.getFullYear() + parseInt(req.query.amount))
        console.log('years')
        console.log(myDate)
      }
    }

    if(req.query.action === 'to the past') {
      if(req.query.units === 'days') {
        myDate.setUTCDate(myDate.getUTCDate() - parseInt(req.query.amount))
        console.log('days')
        console.log(myDate)
      }
      if(req.query.units === 'months') {
        myDate.setUTCMonth(myDate.getUTCMonth() - parseInt(req.query.amount))
        console.log('months')
        console.log(myDate)
      }
      if(req.query.units === 'years') {
        myDate.setFullYear(myDate.getFullYear() - parseInt(req.query.amount))
        console.log('years')
        console.log(myDate)
      }
    }

    var options = ['days', 'months', 'years'];

    res.render('index',{
      when: toDateStr(myDate),
      amount: req.query.amount,
      options: options,
      units: req.query.units
    });
  });

  app.listen(3000);
