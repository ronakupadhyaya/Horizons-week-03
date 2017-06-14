"use strict";
var express = require('express');
var app = express();

//to get express templating
var handlebars = require('express-handlebars');
//configuring
app.engine('hbs', handlebars({
	extname: '.hbs'
}))
app.set('view engine', 'hbs');

app.get('/', function(req, res){
	res.render('hello')
});

app.get('/:error', function(req, res){
	console.log(req.params.error);
	res.render('error_page', {
		myError: req.params.error
	});
	
});

app.listen(3000);
console.log('Started');