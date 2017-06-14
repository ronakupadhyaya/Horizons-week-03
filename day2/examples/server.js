// YOUR CODE HERE
var express = require('express');
var app = express();

// GET /: Send the string "The Horizons Poet API v1.0".
app.get('/' ,function(req, res){
  res.send("The Horizons Poet API v1.0");
});



// GET /api/poem: Send the text from the file /week03/day2/examples/poem.txt
// use the following code to read poem.txt
app.get('/api/poem' ,function(req, res){
  var fs = require('fs');
  var poem = fs.readFileSync('./poem.txt', 'utf8');
  res.send(poem)
});

// POST /api/success: Send the json {success: true} using res.json()
app.post('/api/success' ,function(req, res){
  res.json({success:true});
});

// GET /api: Send the string "We couldn’t find any routes matching this endpoint".
// * denotes any string (i.e. /api/anything, /api/unicorn, /api/p/r/a/t/h, etc.)
// you will need to use app.use() for this
app.use('/api' ,function(req, res){
  res.send("We couldn’t find any routes matching this endpoint")
});

app.listen(3000);
