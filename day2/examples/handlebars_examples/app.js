// Get set up express!
var express = require('express');
var app = express();

// Set up handlebars
var handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
  extname: '.hbs'
}))

app.set('view engine', 'hbs');

app.get('/', function(request, response){
  response.render('defaultPageTemplate');
})

app.get('/:error', function(request, response){
  response.send(request.params.error + " page not found, did you enter the correct url?");
});


app.listen(3000);
