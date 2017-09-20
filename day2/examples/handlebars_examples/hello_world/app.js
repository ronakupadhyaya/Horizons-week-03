var express = require('express');
var app = express();

var handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
  extname:'.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', function(req, res){
  var name = req.query;
  res.render('myFirstTemplate', {
    greetingName:name
  });
});

app.listen(8000);
console.log('Started');
