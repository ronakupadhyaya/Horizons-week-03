var express = require('express');
var handlebars = require('express-handlebars');
var app = express();
app.engine('.hbs', handlebars ({
  extname:'.hbs'
}))
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('handle')
})

app.get('/good/:error', function(req, res) {
  var problem = req.params.error || "page not found, did you enter the correct url?";
  res.render('handle', {
    err: problem
  })
})

app.listen(3000);
