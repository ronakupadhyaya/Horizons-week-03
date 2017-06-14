// Let's bring express into this file!
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

app.get('/*', function(request, response) {
  response.send('"<error> page not found, did you enter the correct url?')
});



// Start the server listening on port 3000.
app.listen(3000);
