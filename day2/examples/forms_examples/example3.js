var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var data = require('./accounts');
var app = express();


// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
	var name;
	var email = req.body.email;
	var password = req.body.password;
	data.forEach(function(person) {
		if (person.email === email && person.password === password) {
			name = person.first_name;
		}
	})
	res.render('example3', {
		email: email,
		password: password,
		name: name
	})
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
