// YOUR CODE HERE
var express = require('express');
var app = express();

app.get('/', function(rec, res) {
    res.send('The Horizons Poet API v1.0');
})

/* app.use('/api/*', function(rec, res) {
    res.send('We couldn’t find any routes matching this endpoint');
}) */

app.get('/api/poem', function(rec, res) {
    var fs = require('fs');
    var poem = fs.readFileSync('./poem.txt', 'utf8');
    res.send(poem);
})

app.post('/api/json', function(rec, res) {
    res.json({success: true});
})

app.listen(3000);
console.log("Started")