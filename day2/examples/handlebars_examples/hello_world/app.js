var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname:'.hbs'
}));
app.set('view engine','hbs')

app.get('/', function(request, response) {
  response.render('HBSfile')
});

app.get('/:error', function(request, response) {
  response.send(request.params.error + ' page not found, did you enter the correct url?')
});

// Start the server listening on port 3000.
app.listen(3000);
