"use strict";


var express = require('express');
var app = express();


var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: ".hbs"
}));

app.set('view engine', 'hbs');

app.get('/', function(req,res){
  res.render("myTemplate")
})

app.get('/:error', function(req,res){
  var myE = req.params.error || "invalid"
  res.render("error",{
    error: myE
  })
})


app.listen(3000);
