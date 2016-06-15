// Let's bring express into this file!
var express = require('express');

// Let's create a new express app
var app = express();
var port = 3000; 

// Example route:
// This creates an Express route at http://localhost:3000
// app.get('/', function(request, response) { //'/' is what goes in the url
//   response.send('Express is running!') //how you display text to page
// });

// Create a route that listens to /hello and takes one query parameter
// name and responds with 'Hello there NAME!'
// You can access the query parameter 'name' via request.query.name.

// app.get('/hello', function(request, response){
	// var name = request.query.name; 
	// if(!name){
	// 	name = 'mysterious stranger';
	 // }
	// var paramName = request.params.name;
	// if(!paramName){
	// 	paramName = 'mysterious stranger';
	// }
	
	// find errors -->
// 	if(!request.query.name){
// 		response.sendStatus(400).send("you missed name"); 
// 	}else{ 
// 		response.send('Hello'+request.query.name); 
// 	} // You get a 'bad request' if you missed something, good to find errors 
// 	console.log(name);
// 	response.send ('hello there ' + name);
// });
// 

// app.get('/info', function(request, response){
// 	var response = ''; 
// 	reponse.send(response).type('text/plain');
// })
	var template = require('express-handlebars'); 
	app.engine('handlebars', template()); 
	app.set('views', __dirname + '/views');
	app.get('/', function( request, response){
		response.render('index.handlebars', // .render uses 'views'
			name: request.query.name,
			destination: 'http://www.google.com')
	});

 

// YOUR CODE HERE

// Start the server listening on port 3000.
app.listen(port);
console.log('Express started on port '+port)
