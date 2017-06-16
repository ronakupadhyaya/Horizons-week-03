"use strict";

var express = require('express');
var app = express();
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Enable POST request body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// We use a variable to keep count
var count = 0;

app.get('/', function(req, res) {
  res.render('index.hbs', {
    count: count
  });
});

app.post('/up', function(req, res){
  count++;
  res.json({count:count});
});


// Implement POST /down route
// YOUR CODE HERE
app.post("/down", function(req, res){
  count--;
  res.json({count:count});
});
// YOUR CODE HERE

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
