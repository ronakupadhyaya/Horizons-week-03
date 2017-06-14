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
	res.render('profiles.hbs', {
		students: data
	})
})

app.get('/:gender', function(req, res) {
	var gender = 0; 

	if (req.params.gender === 'male') {
		var gender = 'Male'
	}

	if (req.params.gender === 'female') {
		var gender = 'Female'
	}

	var students = data.filter(function(student) {
		return student.gender === gender; 
	})
	res.render('profiles.hbs', {
		students: students
	})
})

app.listen(3000);



