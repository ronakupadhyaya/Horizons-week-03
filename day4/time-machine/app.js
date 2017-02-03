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
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()+1);
}

app.get('/', function(req, res) {

  var x = parseInt(req.query.amount);
  if(req.query.action === 'to the future'){
  if(req.query.units === 'days'){
    var day = x + req.query.when.getDate()+1; 
    if(day>31){
      day = x - 31;
    }
  }
  else if(req.query.units === 'months'){
    var month = x + req.query.when.getMonth()+1; 
    if(month>12){
      month = x - 12;
    }
  }
  if(req.query.units === 'years'){
    var year = x + req.query.when.getFullYear(); 
  }
}

  if(req.query.action === 'to the past'){
  if(req.query.units === 'days'){
    var days = x - req.query.when.getDate()+1; 
    if(days<0){
      days = x + 31;
    }
  }
  else if(req.query.units === 'months'){
    x = x - req.query.when.getMonth()+1; 
    if(x<0){
      x = x + 12;
    }
  }
  if(req.query.units === 'years'){
    x = x + req.query.when.getFullYear(); 
  }
}
  var finaldate = day + "/" + month + "/" + year; 
  finaldate.toString();
  req.query.when = finaldate;
  res.render('index',{
    time: req.query.when,
    howmuch: res.query.amount
  });
});

app.listen(3000);
