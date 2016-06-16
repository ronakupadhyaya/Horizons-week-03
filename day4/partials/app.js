var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

// .engine below tells us that when you see a template, 
// assume that it has a .hbs name
app.engine('hbs', exphbs({
	'extname':'hbs',
	// 'defaultLayout': 'main'
	// we did not make a layouts folder
	// but this folder would go in views
	// AND it would be called main.hbs
}));

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
	// you render the text in here 
	// into {{{body}}}
    res.render('index');
});

app.get('/other', function (req, res) {
	// you render the text in here 
	// into {{{body}}}
    res.render('other');
});


app.listen(3000);
