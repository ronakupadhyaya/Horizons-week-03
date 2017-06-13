var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
// require converts to json for you
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var dataMapper = function(data) {
	var newData = [];
	data.forEach(function(item){
		var datum = {
			firstName: item.first_name,
			lastName: item.last_name,
			email: item.email,
			gender: item.gender
		}
		newData.push(datum);
	})
	return newData;
}

var mappedData = dataMapper(data);

app.get('/', function(req, res){
	res.render('index', {
		data: mappedData
	})
})

app.get('/males', function(req, res) {
	var males = [];
	mappedData.forEach(function(student){
		if (student.gender === "Male") {
			males.push(student);
		}
	})
	res.render('males', {
		males: males
	})
})

app.get('/females', function(req, res) {
	var females = [];
	mappedData.forEach(function(student){
		if (student.gender === "Female") {
			females.push(student);
		}
	})
	res.render('females', {
		females: females
	})
})

app.listen(3000);



