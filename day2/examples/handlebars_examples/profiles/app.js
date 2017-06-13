var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
// put handlebars in here
app.engine('hbs', exphbs({
	extname:'hbs',
	helpers: {
		'if_eq': function(a, b, opts) {
				if(a === b){
					return opts.fn(this);
				} else {
					return opts.inverse(this);
				}
			}
	}
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// all students
app.get('/', function(req, res){
	res.render('index', {
		data: data,
		genderQuery: false
	});
});

// male/female
app.get('/:gender', function(req, res){
	var gender = req.params.gender;
	var male = (gender === "male") ? true : false;
	// or here
	res.render('index', {
		male: male,
		data: data,
		genderQuery: true
	});
});

app.listen(3000);



