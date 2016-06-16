var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({extname:'hbs'}));

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// This represents the controller in the MVC model
app.get('/', function (req, res) {
    res.render('index.hbs');
});

// app.get('/', function(req, res) {
// 	res.render('success.hbs');
// });

app.listen(3000);
