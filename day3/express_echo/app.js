// Let's bring express into this file!
var express = require('express');

// Let's create a new express app
var app = express();
var port = 8888;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded{{extended : false}})
// Example route:
// This creates an Express route at http://localhost:8888
// app.get('/', function(request, response) {
//   response.send('Express is running!')
// });
// app.get('/hello', function(request, response) {
//   response.send('Hello is running!')
//   var name = request.query.name;
//   if (!name) {
//   	name = "mysterious stranger";
//   }
//   	paramName = request.params.name
//   	if (!paramName){
//   		paramName = "mysterious stranger";
//   	}
//   })
// });
// app.get('/info', function(request, response) {
//   var resp = '<h1>HTML</h1>';
 
//   resp += "Query:" + JSON.stringify(request.query) + "\n"
//   resp += "Method:" + request.method + "\n";
//   resp += "Method:" + request.path + "\n";
//   resp += "Original URL:" + request.originallUrl + "\n";


  // response.type('text/plain')
  // response.send(resp)
// });
var template = require("express-handlebars")
app.engine("handlebars", require("express-handlebards")());
// app.set("view engine", "hbs");
app.set("view", __dirname + "_views")

app.get("/", function(request, response){
	response.render("index.handlebars"),
	{
	textField : request.query.textField,
		// name: request.query.name,
		// destination: "http://google.com"
		// numbers:{
		// 	(name: 1, id:5)
		// 	(name: 2, id:7)
		// 	(name: 3, id:10)
		}

	}
})


// app.user(express.static("public"));
// app.get("/html", function(request, response){
//   	response.send(<a href= "http://google.com">link to google</a>)
// });

// Create a route that listens to /hello and takes one query parameter
// name and responds with 'Hello there NAME!'
// You can access the query parameter 'name' via request.query.name.

// YOUR CODE HERE
app.get('/hello', function(request, response) {
  // response.send('Express is HA!')
  var name = request.query.name;
  if (! request.query.name){
  	response.sendStatus(400);
  } else {
  	response.send("Hello there" + ' ' + request.query.name)
  	// response.redirect(request.query.url) to send you to a url
  }

})


// Start the server listening on port 3000.
app.listen(port);
console.log("Express started on port" + port)
