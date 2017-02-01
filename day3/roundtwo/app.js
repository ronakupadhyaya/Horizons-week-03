"use strict";
var express = require('express');
var exhbs = require('express-handlebars');
var app = express();
app.engine('hbs', exhbs({extname:'hbs', defaultLayout:'main.hbs'}));

app.set('view engine', 'hbs');

app.get('/:name/:num', function(req, res){
  //cant do req.body because tehres no body parser set up !
  res.render('myView', {name: req.params.name, num: req.params.num})
});
app.listen(3000);
