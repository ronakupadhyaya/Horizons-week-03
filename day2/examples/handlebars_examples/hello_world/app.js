"use strict"
var express = require('express');
var handlebars = require('express-handlebars');
var app = express();
app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render("helloWorld");
});

app.get('/:error', function(req, res) {
    res.send(req.params.error + ' page not found, did you enter the correct url?');
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});