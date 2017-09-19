var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('templ')
});

app.get('/:error', function(req, res){
  res.render('temp2', {wrongName: req.params.error});
});

app.listen(3000);
