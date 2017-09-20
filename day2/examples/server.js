// YOUR CODE HERE
var fs = require('fs'); 
var express = require('express'); 
var app = express(); 

app.get('/', function(req, res) {
	res.send("The Horizons Poet API v1.0");
}); 

app.post('/api/success', function(req, res) {
	var jason = {success: true}; 
	res.json(jason); 
});

app.get('/api/poem', function(req, res) {
	console.log('purple flowers');
	var poem = fs.readFileSync('./poem.txt', 'utf8');
	res.send(poem); 
}); 

app.use('/api/*', function(req, res) {
	res.send("We couldn't find any routes matching this endpoint.");
});
 

app.listen(3000); 
console.log('shorts 4'); 
