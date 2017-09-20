var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var data = require('./data.json');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(request, response) {
	response.render('template.hbs', {
		students: data
	});
	// var isGender = (request.query.gender ? male : female);
	// if (isGender === male) {
	// 	console.log('is male');

	// }
    // res.render('condition', {ingrid: req.query.word, isEven: isEven});
});

app.get('/male', function(request, response) {
	var maleArray = []; 
	for (var i=0; i<data.length; i++) {
			if (data[i].gender === 'Male') {
				maleArray.push(data[i]);
		}
	}
	response.render('template.hbs', {
		students: maleArray
	});
});

app.get('/female', function(request, response) {
	var femaleArray = []; 
	for (var i=0; i<data.length; i++) {
			if (data[i].gender === 'Female') {
				femaleArray.push(data[i]);
		}
	}
	response.render('template.hbs', {
		students: femaleArray
	});
});


app.listen(3000);
console.log('gender');



