"use strict";
var express = require('express');
var exhbs = require('express-handlebars');
var app = express();
app.engine('hbs', exhbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

app.get('/:name/:num', function(req, res){
  res.render('myView', {name: 'Rick', num:'5'})
});
app.listen(3000);
