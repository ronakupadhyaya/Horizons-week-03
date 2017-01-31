var express = require('express')
var app = express();



app.get('/', function(request, response, next) {
  response.type('text/html');
  response.send('<h1>Hello there</h1>');
});

app.listen(3000);
