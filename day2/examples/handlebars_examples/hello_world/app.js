var handlebars = require('express-handlebars')

var express = require('express');
var app = express();


app.engine('hbs', handlebars({
  extname: '.hbs'
}))
app.set('view engine', 'hbs');

app.get('/', function(req,res){
  res.render('hello');
})

app.get('/:error', function(req,res){
  res.render(`errors`, {
    error: req.params.error
  });
})


app.listen(3000);
