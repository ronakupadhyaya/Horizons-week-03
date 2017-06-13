var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get("/", function(req, res) {
	res.render("index", {command1: true, data: data});
});

app.get("/:command", function(req, res) {
	isMale = req.params.command === "male";
	res.render("index", {command1: false, command2: isMale, data: data});
});

app.listen(3000);



