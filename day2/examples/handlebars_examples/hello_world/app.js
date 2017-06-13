var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

// engine has to be called before you call render
app.engine('hbs', handlebars({
	extname: '.hbs'
}))

app.set('view engine', 'hbs');

app.get('/', function(req, res) {
	res.render('index');

})

app.get('/hello', function(req, res) {
	res.send('hello again');
})

app.get('/:error', function(req, res) {
	res.send(req.params.error + ' page not found, did you enter the correct url?')

})

app.listen(3000);