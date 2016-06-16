var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

// when you see a template, assume that it has a .hbs name
app.engine('hbs', exphbs({
	'extname':'hbs',
	'defaultLayout': 'main'
}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.render('index.hbs');
});


app.listen(3000);
