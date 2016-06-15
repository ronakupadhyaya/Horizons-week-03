// Let's bring express into this file!
var express = require('express');

// Let's create a new express app
var app = express();
var port = 3000;

// Example route:
// This creates an Express route at http://localhost:3000
app.get('/', function(request, response) {
  response.send('Express is running!')
});

// Create a route that listens to /hello and takes one query parameter
// name and responds with 'Hello there NAME!'
// You can access the query parameter 'name' via request.query.name.

// YOUR CODE HERE

app.get('/hello', function(request, response) {
  var name = request.query.name;
  if(! name) {
  	name = "mysterious stranger";
  }
  response.send('Hello there, ' + name);
});

// app.use('/boards', function(request, response) {
//   var resp = "";
//   resp += "Query: " + JSON.stringify(request.query) + '\n';
//   resp += 'Method: ' + request.method() + '\n';
//   resp += "Path: " + request.path + '\n';
//   resp += "Original URL: " + request.originalURL + '\n';
//   response.send(resp);
// });

// Start the server listening on port 3000.
app.listen(port);
console.log("Express started on port " + port);
