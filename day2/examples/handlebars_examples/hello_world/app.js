var express = require('express');
var app = express();
//// views folder is default?
var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}))
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('myTemp');
})
app.get('/:error', function(req, res) {
  var params = req.params.error;
  res.render('tempError', {
    par: params
  })
})

app.listen(3000);
console.log('server is running');
