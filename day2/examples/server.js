var express = require('express')
var app = express()

var fs = require('fs');
var poem = fs.readFileSync('./poem.txt', 'utf8');

app.get('/', function(rec, res){
  res.send('The Horizons Poet API v1.0')
})

app.get('/api/poem', function(rec, res){
  res.send(poem)
})

app.post('/api/success', function(rec, res){
  res.json({success: true})
})

app.use('/api/*', function(rec, res){
  res.send('We couldn’t find any routes matching this endpoint')
})

app.listen(3000)

console.log('server running')
