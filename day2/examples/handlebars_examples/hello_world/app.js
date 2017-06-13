// require express
var express = require('express');
var app = express();
app.listen(3000);
// require handlebars
var handlebars = require('express-handlebars');

// use handlbars to handle .hbs files
app.engine('hbs', handlebars({
	extname: '.hbs'
}));
// use .hbs as default engine
app.set('view engine', 'hbs');

app.get('/', function(req, res){
	res.render('hello_page');
});

app.get('/:error', function(req, res){
	res.render('error_page', {
		error: req.params.error	
	});
});


