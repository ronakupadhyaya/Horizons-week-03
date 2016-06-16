var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');

var mongoose = require('mongoose');
mongoose.connect(require('./connect'));
var Cat = mongoose.model('Cat', {name: String, furColor: String})


var app = express();

app.engine('hbs', exphbs({
	'extname':'hbs',listen
})



app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
	var query = {};
	Cat.find(function(error, cats) {
    	res.render('index.hbs',{
    		cats:cats
    	})
    });
});


app.listen(3000);
