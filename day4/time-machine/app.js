var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs(
  {
    extname: '.hbs',
    helpers: {
      water: function(options, selectedOption){
        vat ret ='';
        for (var i=0; i<options.length; i++){
          if(selectedOption === options[i])
          ret += '<option selected> '+ options[i] + '</option>'
        }else {
          ret += '<option> '+ options[i] + '</option>'
        }
        return '<h1>   </h1>'
      }

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
    var when = req.query.when;
    var date = new Date(when);
    var amount = req.query.amount;
    if(req.query.action === "to the past"){
      amount =- amount;
    }
      if(req.query.units === 'days'){
        date.setDate(date.getDate() + parseInt(req.query.amount));
      }
      else if(req.query.units === 'months'){
        date.setMonth(date.getMonth() + parseInt(req.query.amount));
      }
      else if(req.query.units === 'years'){
        date.setFullYear(date.getFullYear() + parseInt(req.query.amount));
      }

    // var date = req.query.when;
    // var amount = req.query.amount || 0;
    // var units = req.query.units;
    // var time = new Date(Date.parse(toDateStr));
    // var newDate;
    // if ( units === "days"){
    //   var value = time.valueOf();
    //   value += 86400000 * amount;
    //   newDate =  Date(value);
    //
    // }
    // else if (req.query.units === 'months'){
    //
    // }
    // else {
    //
    // }
    // console.log(toDateStr(new Date(newDate)))
    // YOUR CODE HERE
    res.render('index', {
      time: req.query.when,
      howMuch: req.query.amount,
      options: ['days', 'months', 'years'],
      units: req.query.units
    });
  });

  app.listen(3000);
