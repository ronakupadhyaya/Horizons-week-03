var express = require('express');
var app = express();

var handlebars = require('express-handlebars')
app.engine('.hbs', handlebars({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.get('/', function(request, response) {
  response.render('s3.hbs')
})

app.get('/:error', function(request, response) {
  var err = request.params.error
  response.render('errors',{
      e: err
  })
})

app.listen(3000);