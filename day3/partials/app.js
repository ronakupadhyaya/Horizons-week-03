"use strict";

var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({
  extname:'hbs',
  defaultLayout:'success'
}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index',{
    msg:"GOODJOB"
  });
});

app.get('/second', function (req, res) {
  res.render('second', {
    msg:"error"
  });
});


app.listen(3000);
