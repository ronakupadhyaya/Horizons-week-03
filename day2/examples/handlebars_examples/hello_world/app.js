// Let's bring express into this file!
var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

app.listen(3000);
console.log("Started");

app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');


app.get('/', function(request, response) {
  response.render('HWfile')
});

app.get('/:error', function(request, response) {
  response.send(request.params.error + ' page not found, did you enter the correct url?')
});
