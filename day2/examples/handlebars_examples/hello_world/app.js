var express = require('express');

var app = express();

var handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs')

app.get('/', function(request, response) {
  response.render('myFirstTemplate')
});

app.get('/:error', function(request, response) {
  response.send(request.params.error + " page not found. Did you enter the correct url?")
});

app.listen(3000);
console.log('started');
