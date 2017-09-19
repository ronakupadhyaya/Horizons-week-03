// Let's bring express into this file!
var express = require('express');

// Let's create a new express app
var app = express();
var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

// Example route:
// This creates an Express route at http://localhost:3000
app.get('/', function(req, res) {
  res.render('myTemplate')
});

app.get('/:error', function(req, res) {
  res.send(req.params.error + " page not found, did you enter the correct url?");
});

// Start the server listening on port 3000.
app.listen(3000);
