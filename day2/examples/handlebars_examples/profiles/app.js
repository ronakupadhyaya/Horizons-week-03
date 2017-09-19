var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(req, res) {
	res.render('index', {
		data: data
		})
})

app.get('/male', function(req, res) {
	males = data.filter(function(obj) {
		if(obj.gender === 'Male') {
			return true;
		}
	})
	res.render('index', {
		data: males
	})
})

app.get('/female', function(req, res) {
	females = data.filter(function(obj) {
		if(obj.gender === 'Female') {
			return true;
		}
	})
	res.render('index', {
		data: females
	})
})

app.listen(3000);



