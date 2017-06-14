var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
// /: Displays the text "Hello World" from a .hbs file
app.get('/', function(request, response) {
  response.render('hello');
});

// /:error: Displays the text "<error> page not found, did you enter the correct url?"
// where <error> is the text entered as a param.
app.get('/:error', function(request, response) {
  var name = req.query.error || 'about';
  response.render('temp', {
    theError: error
  });
});

// Start the server listening on port 3000.
app.listen(3000);
