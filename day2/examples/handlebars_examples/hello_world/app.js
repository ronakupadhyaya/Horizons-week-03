var express = require('express');
var handlebars = require('express-handlebars');
app = express();
app.engine('hbs', handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('start')
});

app.get('/:error', function(req, res) {
  res.render('error', {
    error_page: req.params.error
  })
})
app.listen(3000)
