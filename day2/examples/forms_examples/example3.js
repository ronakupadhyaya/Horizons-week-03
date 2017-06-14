var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

var accounts = require('./accounts.json')

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser= require('body-parser'); 
app.use(bodyParser({extended: true})); 

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
	console.log('flag'); 
    var user = req.body.first_name; 
    var password = req.body.secret; 
    var arr =[]
    var success
    for (var i = 0; i < accounts.length; i++) {
    	if (user === accounts[i].email && password === accounts[i].password) {
    		arr.push(user, password)
    	}
    }

    var success = arr.length === 2 ? true : false;   
    var failure = arr.length === 2 ? false : true; 
    console.log(success);
    console.log(failure);

    res.render('example3', {
    	success: success, 
    	failure: failure, 
    	name: user
    })
});



// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
