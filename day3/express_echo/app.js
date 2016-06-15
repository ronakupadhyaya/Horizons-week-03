"use strict";

// Let's bring express into this file!
var express = require('express');
var template = require('express-handlebars');
app.engine('hbs', template()); // what you're setting file extension to
app.set('view engine', 'hbs'); // don't need to put .hbs in file call
app.set('views', __dirname + '/views'); // sets directory path

// Let's create a new express app
var app = express();
var port = 8888;
// Example route:
// This creates an Express route at http://localhost:3000
app.get('/', function(request, response) {
  response.send('Express is running!')
});


// Create a route that listens to /hello and takes one query parameter
// name and responds with 'Hello there NAME!'
// You can access the query parameter 'name' via request.query.name.
app.get('/hello', function(request, response){
	var name = request.query.name;
	response.send("Hello there" + name);
})

// YOUR CODE HERE

// Start the server listening on port 3000.
app.listen(8888);
