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
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate() + 1);
}

app.get('/', function(req, res) {
//date
var date = new Date(when);

if(req.query.units === 'days'){
  date.setDate(date.getDate() + parseInt(req.query.amount));
}

  res.render('index', {time: toDateStr(date), amount: req.query.amount});
}); //on express, the things after the ? in the url are the equivalent of req.query
//req.query.___ <-- this has the be the name of the of the inputs on hbs
// the left hand side has to match with whatever's inside the curly of your template
// everything that comes from req.query (like req.query.amount) is a STRING so you gotta PARSE it
app.listen(3000);
