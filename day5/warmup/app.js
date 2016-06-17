var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// We use a variable to store the count
var count = 0;

// Display the current count
app.get('/', function(req, res) {
  res.render('index', {
    count: count
  });
});

// ---Task 1---
// POST /increment: create an endpoint (aka route) that increases the variable
// 'count' by one and redirects back to /

// YOUR CODE HERE
app.post('/increment', function(req,res){
	count++;
	res.json({
		count: count
	})
	//renderig on a post request: refreshing the page will add to the activity,
	//whereas refreshing with a ridirect will not make a number go up
	//refresh just does get request
})

app.get('/increment', function(req,res){
	count++
	res.json({
		count: count
	})
	res.redirect('/')
})

// ---Task 2---
// POST /decrement: create an endpoint (aka route) that decreases the variable
// 'count' by one and redirects back to /

// YOUR CODE HERE
app.post('/decrement', function(req,res){
	count--;
	res.redirect('/')
})

app.post('/get', function(req,res){
	count++; 
	res.json({
		count: count
	})
})

app.get('/data', function(req,res){
	res.json({ //turn a js object into json through express
		a: [1,2,3,4],
		b: false
	})
})

app.listen(3000);
