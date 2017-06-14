var express = require('express');
var handlebars = require('express-handlebars');

var app = express();

app.engine('hbs', handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('index');
})

app.get('/:err', function(req, res) {
  res.render('error', {
    error: req.params.err
  });
});

app.listen(3000);