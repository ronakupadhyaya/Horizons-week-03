var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();

app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('hellow');
});

app.get('/', function(req, res) {
  res.render('hellow');
});

app.get('/:error', function(req, res) {
  res.send( req.params.error + " page not found, did you enter the correct url?");
});


app.listen(3000);