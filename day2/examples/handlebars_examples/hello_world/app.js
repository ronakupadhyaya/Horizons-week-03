var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('templateOne')
})

app.get('/:error', function(req, res) {
  var pageName = req.params.error || "error";
  res.render('templateError', {
    page: pageName
  });
})

app.listen(3000);
