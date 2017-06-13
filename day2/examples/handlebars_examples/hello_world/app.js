var express = require('express');
var handlebars = require('express-handlebars');
var app = express()

app.engine('hbs', handlebars({
	extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
	res.render('my_first_template')
});

app.get('/:error', function (req, res) {
	res.render('my_second_template', {
		error: req.params.error
	})
});

app.listen(3000);