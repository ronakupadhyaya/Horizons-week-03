const express = require('express');
const handlebars = require('express-handlebars');
var app = express();

app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  var text = "Hello " + (req.query.name || 'Slagathor')
  res.render('template', {
    words: text
  })
})

app.get('/:error', function(req, res) {
  var text = req.params.error + " page not found, did you enter the correct url?"
  res.render('template', {
    words: text
  })
})

app.listen(3000);
console.log('started');
