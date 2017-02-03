var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs(
  {
    extname: '.hbs',
    helpers: {
      water: function() {
      var ret=
      for(var i=0;i<options.length;i++) {
        ret +=
      '<h1>I AM HERE</h1>'
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
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}

app.get('/', function(req, res) {

  // YOUR CODE HERE
  res.render('index', {
      time: req.query.when,
    number:req.query.amount
  });
});

app.listen(3000);
