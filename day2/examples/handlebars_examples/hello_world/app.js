var exp = require('express');
var app = exp();

var handles = require('express-handlebars');

app.engine('hbs', handles({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('hello');
});

app.get('/:error', function(req, res){
  res.send(req.params.error + " page not found, did you enter the correct url?");
});

app.listen(3000);
