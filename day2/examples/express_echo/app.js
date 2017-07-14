// Let's bring express into this file!
var express = require('express');
var fs = require('fs');
var poem = fs.readFileSync('./poem.txt', 'utf8');
var handlebars = require('express-handlebars');

// Let's create a new express app
var app = express();

// Example route:
// This creates an Express route at http://localhost:3000

app.engine('hbs', handlebars({
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.get('/greet', function(req, res) {
  // var name = req.query.name || 'mysterious stranger';
  res.render('myFirstTemplate', {
    greetingName: req.query.name
  });
})
// app.get('/', function(req, res) {
//   res.send('Hello World');
// })
//
// app.get('/:error', function(req, res) {
//   var error = req.params.error;
//   res.send(error + ' page not found, did you enter the correct url?')
// })
// app.get('/', function(req, res) {
//   res.send('The Horizons Poet API v1.0')
// })
//
// app.get('/api/poem', function(req, res) {
//   res.send(poem);
// })
//
// app.post('/api/success', function(req, res) {
//   res.json({success: true})
// })
//
// app.use('/api/*', function(req, res) {
//   res.send('couldnt find any routes matching endpoint')
// })
//
// app.get('/greet/:name', function(req, res) {
//   res.send('Hello ' + req.params.name)
// })
//
// app.get('/girl', function (req, res) {
//   res.send('Hello ' + req.query.firstName + ' ' + req.query.lastName)
// })


// app.get('/', function(request, response) {
//   response.send('Express is running!')
// });
//
// app.get('/second', function(req, res) {
//   res.send('second route yay!!!')
// })
//
// app.post('/second', function(req, res) {
//   res.send('i got a post request');
// })
//
// app.put('/second', function(req, res) {
//   res.send('i got a put request');
// })
//
// app.delete('/second', function(req, res) {
//   res.send('i got a delete request');
// })
//
// app.use('/any', function(req, res) {
//   res.send('i got any request');
// })

// Create a route that listens to /hello and takes one query parameter
// name and responds with 'Hello there NAME!'
// You can access the query parameter 'name' via request.query.name.

// app.get('/hello', function(request, response) {
//   response.send("Hello there " + request.query.name + "!")
// })

// Start the server listening on port 3000.
app.listen(3000);
console.log('started!!!!!')
