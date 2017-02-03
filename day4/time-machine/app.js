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
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate() + 1); // b/c zero-indexed
}

app.get('/', function(req, res) {
  // YOUR CODE HERE

  var when = req.query.when;
  var date = new Date(when);

  if(req.query.whichButton === 'to the future'){

    if(req.query.units === 'days'){
      date.setDate(date.getDate() + parseInt(req.query.amount));
    } else if(req.query.units === 'months'){
      date.setDate(date.getMonth() + parseInt(req.query.amount));
    }
    else if(req.query.units === 'years'){
      date.setDate(date.getFullYear() + parseInt(req.query.amount));
    }

  } else{

    if(req.query.units === 'days'){
      date.setDate(date.getDate() - parseInt(req.query.amount));
    } else if(req.query.units === 'months'){
      date.setDate(date.getMonth() - parseInt(req.query.amount));
    }
    else if(req.query.units === 'years'){
      date.setDate(date.getFullYear() - parseInt(req.query.amount));
    }

  }

  res.render('index', {
    time: toDateStr(date),
    howMuch: req.query.amount
  });


});

app.listen(3000);
