// Let's bring express into this file!
var express = require('express');

// Let's create a new express app
var app = express();

// Example route:
// This creates an Express route at http://localhost:3000
// app.get('/', function(request, response) {
//   response.send('Express is running!')
// });

// Create a route that listens to /hello and takes one query parameter
// name and responds with 'Hello there NAME!'
// You can access the query parameter 'name' via request.query.name.


// CORRECT CODE HERE
// app.get('/hello', function(request, response) {
//   response.send('Hello there ' + request.query.name);
// });


app.get('/', function(request, response, next) {
  var name = request.query.name || 'mysterious stranger';
  response.format({
    'text/plain': function() {
      response.send('Hello ' + name);
    },
    'text/html': function() {
      response.send('<h1>Hello ' + name + '</h1>');
    }
  });
}); 


// Start the server listening on port 3000.
app.listen(3000);
