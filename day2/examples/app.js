var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('hello ' + req.query.name + ' ' + req.query.lastname)
})

app.get('/hi/', function(req, res) {
  res.status(201).send('hello')
})

app.get('/status/:statuscode', function(req, res) {
  res.sendStatus(req.params.statuscode)
})

app.get('/greet/:name', function(req, res) {
  res.send('hello ' + req.params.name)
})


app.get('/second', function(req, res) {
  res.send('second route yo')
})











app.listen(3000);
console.log('started');
