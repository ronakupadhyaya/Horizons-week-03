var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var fs = require('fs');

var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser({extended: true}));

var JSON_FILE = 'accounts.json'

var data = JSON.parse(fs.readFileSync(JSON_FILE));

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', function(req, res) {
  res.render('example3')
})

app.post('/login', function(req, res) {
	var em = req.body.email
  data.forEach(function(x){
  	if(x.email !== em){
  		res.render('example3',{
  			name: 'Error'
  		})
  	}else{
  		res.render('example3',{
  			name: x.first_name
  		})
  	}
	})
})


// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
