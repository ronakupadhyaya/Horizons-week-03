var express = require('express');
var app = express();
var handlebars = require('express-handlebars')
app.engine('hbs', handlebars({
  extname: ".hbs"
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render("temp")
})
app.get('/:error', function(req, res) {
  var err = req.query.error;
  res.render("temp2", {
    error: err
  })
})
app.listen(3000)
