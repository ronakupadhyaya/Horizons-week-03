// Let's bring express into this file!
var express = require('express');

// Let's create a new express app
var app = express();
var handlebars=require('express-handlebars');
app.engine('hbs',handlebars({
  extname:'.hbs'
}));
app.set('view engine','hbs');

// Example route:
// This creates an Express route at http://localhost:3000
app.get('/', function(request, response) {
  response.render('first')
});

app.get('/:error', function(request, response) {
  response.render('error',{
    pageName:request.params.error
  })
});




// Start the server listening on port 3000.
app.listen(3000);
console.log('sted')
