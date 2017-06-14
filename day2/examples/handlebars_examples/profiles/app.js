var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data'); //array of objects
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/',function(req,res){
	res.render('index.hbs',{
		myData:data
	});
})

app.get('/male',function(req, res){
	var isMale = []
	data.forEach(function(obj){
		if (obj.gender==='Male'){
			isMale.push(obj)
		}
	})

	res.render('male.hbs',{
		myData: isMale,
		gender: req.params.gender,
	})
})

app.get('/female',function(req, res){
	var isFemale = []
	data.forEach(function(obj){
		if (obj.gender==='Female'){
			isFemale.push(obj)
		}
	})

	res.render('female.hbs',{
		myData: isFemale,
		gender: req.params.gender,
	})
})



app.listen(3000);



