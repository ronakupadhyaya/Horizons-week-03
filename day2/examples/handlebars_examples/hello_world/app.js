var express = require('express')
var app = express()
var handlebars = require('express-handlebars')

app.engine('hbs', handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', function(request, response) {
  response.render('template')
})

app.get('/:error', function(request, response) {
  response.render('error', {
    pageName: request.params.error
  })
})



app.listen(4444)
console.log('App started..')
