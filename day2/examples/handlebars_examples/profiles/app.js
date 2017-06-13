var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('index', {
  	data: data
  });
});

app.get('/male', function(req, res) {
	var maleData = []
	data.forEach(function(item, index){
		if (item.gender === "Male") {
			maleData.push(item)
		}
	})
  	res.render('index', {
  	data: maleData
  });
});

app.get('/female', function(req, res) {
	var femaleData = []
	data.forEach(function(item, index){
		if (item.gender === "Female") {
			femaleData.push(item)
		}
	})
  	res.render('index', {
  	data: femaleData
  });
});

app.listen(3000);