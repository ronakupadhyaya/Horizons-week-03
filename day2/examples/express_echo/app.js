// Let's bring express into this file!
var express = require('express');

// Let's create a new express app
var app = express();

// Example route:
// This creates an Express route at http://localhost:3000
app.get('/', function(request, response) {
  response.send('Express is running!')
});

// Create a route that listens to /hello and takes one query parameter
// name and responds with 'Hello there NAME!'
// You can access the query parameter 'name' via request.query.name.
app.get('/greet', function(req, res) {
	var name = req.query.name || 'myserious stranger';
	res.send('<h1>Hello there ' + req.query.name + '!<h1>');
	// renders the template
	res.render('index', {
		greetingName: name
	});
})
// templating
var handlebars = require('handlebars');
// npm install --save express-handlebars
app.engine('hbs', handlebars({
	extname: '.hbs'
}))
app.set('view engine', 'hbs');
// create a new folder called views
// create .hbs files and type in html
// in html {{greetingName}}



// Start the server listening on port 3000.
app.listen(3000);
