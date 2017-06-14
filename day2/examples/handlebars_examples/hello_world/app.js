// Let's bring express into this file!
var express = require('express');
var app = express();

var handlebars = require('express-handlebars');

// Let's create a new express app



// Example route:
// This creates an Express route at http://localhost:3000
app.engine('hbs', handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(request, response) {
  response.render('helloworld');
});

app.get('/:error', function(request, response) {
  response.send(request.params.error + ' page not found, did you enter the correct url?');
});
// Start the server listening on port 3000.
app.listen(3000);
