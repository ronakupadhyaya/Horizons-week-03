var express = require('express');
var app = express();
// var port = process.env.PORT || 3000;

// app.get('/', function (request, response) {
//   response.type('text/plain');
//   response.send('Hello World ' + (request.query.name || 'mysterious stranger'));
// });

app.get('/home/:name', function (request, response) {
  response.type('text/plain');
  response.send('Hello World ' + (request.params.name || 'mysterious stranger'));
});

// app.post('/', function(req, res, next){});
// app.put('/', function(req, res, next){});
// app.delete('/', function(req, res, next){});
app.listen(3000);
console.log('Im running on port %d', 3000);
