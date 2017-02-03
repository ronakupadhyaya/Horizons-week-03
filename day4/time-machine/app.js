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
    return (date.getFullYear()+1) + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()+1);
  }

  app.get('/', function(req, res) {
    // YOUR CODE HERE
    var when = req.query.when;
    var date = new Date(when);

    var amount = parseInt(req.query.amount)
    if(req.query.action === "to the past"){
      amount = -amount;
    }
    if(req.query.units === 'days'){
      date.setDate(date.getDate()+amount);
    } else if (req.query.units === 'months'){
      date.setMonth(date.getMonth()+amount);
    } else if (req.query.units === 'years'){
      date.setFullYear(date.getFullYear()+amount);
    }

    console.log(date)

    date.setFullYear(date.getFullYear()-1)
    if(req.query.units === "days"){
      res.render('index', {check1: 'selected', check2: '', check3: '', arg1: toDateStr(date), arg2: req.query.amount})
    } else if (req.query.units === "months") {
      res.render('index', {check1: '', check2: 'selected', check3: '', arg1: toDateStr(date), arg2: req.query.amount})
    } else if (req.query.units === "years") {
      res.render('index', {check1: '', check2: '', check3: 'selected', arg1: toDateStr(date), arg2: req.query.amount})
    } else {
      res.render('index', {check1: 'selected', check2: '', check3: '', arg1: toDateStr(date), arg2: req.query.amount})
    }

  });

  app.listen(3000);
console.log('whadddup')
