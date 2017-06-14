var express = require('express');
var app = express();


var handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
  extname:'.hbs'
}));

app.set('view engine', '.hbs')

app.get('/', function(req, res){
  res.render('template');
})

app.get('/:error', function(req, res){
  var error = req.params.error;
  res.render('template_error', {
    error: error
  })
})
app.listen(3000)
