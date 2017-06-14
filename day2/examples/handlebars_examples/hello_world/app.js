var express = require('express');
var app = express(); 

var handlebars = require('express-handlebars'); 
app.engine('hbs', handlebars({
	extname: '.hbs'
}))
app.set('view engine', 'hbs'); 

app.get('/', function(req, res) {
	res.render('myFirstTemplate')
})

app.get('/:error', function(req, res) {
	res.render('myFirstTemplate', {
		errorName: req.params.error
	})
}); 

app.listen(3000); 