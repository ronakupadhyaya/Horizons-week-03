var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();
var bodyParser = require('body-parser');

var data = require('./accounts')
app.use(bodyParser({extended: true}));
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3',{});
});

app.post('/login', function(req, res){
	var valid = false;
	var name = "";
	for(var i = 0; i < data.length; i++){
		obj = data[i];
		if(req.body.email === obj.email && req.body.password === obj.password){
			valid = true;
			name = data[i].first_name;
		}
	}
  res.render('example3', {
    email: req.body.email,
    password: req.body.password,
    name: name,
    valid: valid
  });

})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
