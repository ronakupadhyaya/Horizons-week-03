var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
	extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.get('/', function(req, res) {
	res.render('hello');
});
app.get('/:error', function(req, res) {
	var name = req.params.error;
	res.render('hello', {
		error: name
	});
});
app.listen(3000);