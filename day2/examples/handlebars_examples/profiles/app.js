var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE

// /: A directory of ALL students
app.get('/', function(res, req){

});

// /male: A directory of ALL MALE students
app.get('/male', function(res, req){

});

// /female: A directory of ALL FEMALE students
app.get('/female', function(res, req){

});


app.listen(3000);
