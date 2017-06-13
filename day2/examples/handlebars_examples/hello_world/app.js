'use strict';
var express = require('express');
var app = express();

// THIS PART SETS UP THE TEMPLATE [HANDLEBARS]
var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');
// ===========================


//USES THE TEMPLATE.HBS in VIEWS
app.get('/', function(req, resp){
  resp.render('template1');
})
// ===========================


app.get('/:error', function(req,resp){
  var error = req.params.error;
  resp.render('template2', {
    errorName : error
  })
})

app.listen(3000);
