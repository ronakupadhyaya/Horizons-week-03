var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Reading you loud and clear');
});

app.get('/second', function(req, res) {
  res.send('This is the second route. Cool!');
});


app.listen(3000);
console.log('Started');
