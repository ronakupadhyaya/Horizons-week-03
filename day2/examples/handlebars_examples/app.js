// Let's bring express into this file!
var express = require('express');

// Let's create a new express app
var app = express();

var handlebars = require('express-handlebars')
app.engine('hbs',handlebars({
  extname: '.hbs'
}));
app.set('view engine','hbs');


app.get('/', function(request, response) {
  response.render('hello')
});

app.get('/:error', function(request, response) {
  response.send(request.params.error + ' page not found, did you enter the correct url?')
});
app.listen(3000);
