var express = require('express');
var express_handlebars = require('express-handlebars');
var app = express();


app.engine('hbs', express_handlebars({
	extname: '.hbs'
}));

app.set('view engine', 'hbs');


app.get('/', function(req, res) {
  res.render('handlebarTemplate.hbs', {

  });
});

app.get('/:error', function(req, res) {
  res.send(req.params.error +' page not found, did you enter the correct url?')
});

app.listen('3000');
