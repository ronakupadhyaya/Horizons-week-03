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

// app.get('/hello', function(request, response) {
//   response.send('hi');
// })
//
// app.get('/info', function(request, response) {
//   response.send('').type('text/plain');
// })
//
// //use can handle any type of methods
// app.use('/info', function(request, response) {
//   var resp = '';
//   resp += 'Query:' + JSON.stringigy(request.query);
//   resp += 'Query:' + request.method;
//   // request.path;
//   // request.originalUrl
//   response.send('').type('text/plain');
// })
//
// app.get('/info', function(request, response) {
//   var name = request.query.name;
//   if (!name) {
//     name = 'mysterios stranger';
//   }
//   // request.param.name
//   response.send('Hello ' + name);
// })



// Create a route that listens to /hello and takes one query parameter
// name and responds with 'Hello there NAME!'
// You can access the query parameter 'name' via request.query.name.

// YOUR CODE HERE
app.get('/hello', function(request, response) {
  var name = request.query.name;
  if (!name) {
      name = 'mysterios stranger';
    }
  response.send('Hello there ' + name + ' !');
})

// response.sendStatus(400);
// response.status(400).send('you missed name');


app.get('/redirect', function(request, response) {
  var url = request.query.url;
  if (!url) {
      response.sendStatus(400);
    }
  response.redirect(url);

})

app.listen(port);
// Start the server listening on port 3000.
// app.listen(3000);
