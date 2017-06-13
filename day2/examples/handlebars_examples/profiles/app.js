var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var fs = require('fs');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE


var JSON_FILE = 'data.json'

var data = JSON.parse(fs.readFileSync(JSON_FILE));

app.get('/', function(req,res){
	res.render('name', {
		friends: data
	})
})

app.get('/male', function(req,res){
	var emp = []
	data.forEach(function(x){
		if(x.gender ==="Male"){
			emp.push(x)
		}
	})
	// var isMale = ({{gender}} === "Male" ? true : false);
	res.render('name', {
		friends: emp,
	})
})

app.get('/female', function(req,res){
var emp = []
	data.forEach(function(x){
		if(x.gender ==="Female"){
			emp.push(x)
		}
	})
	// var isMale = ({{gender}} === "Male" ? true : false);
	res.render('name', {
		friends: emp,
	})
})



app.listen(3000);



