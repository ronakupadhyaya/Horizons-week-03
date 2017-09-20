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
app.get('/', function(request, response) {
  var name = request.query.name;
  response.render('template', {
  	greetingName: name
  });
});

app.get('/:error', function(request, response) {
  var name = request.query.name;
  response.send(request.params.error + "page not found");
});


app.listen(3000); 
console.log('Saturday night');





