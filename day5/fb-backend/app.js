"use strict";
// some people call app.js - server.js because it is our entry point


// require all the neccessary modules
var mongoose = require('mongoose'); // connect mongoose to our database
var express = require('express');
var bodyParser = require('body-parser');

// do some mongoose configuration (how we connect mongoose to our data)
// Define event handlers before the function that triggers the event
mongoose.connection.on('error', function() {
  console.log('Oh no! Could not connect to database');
});
// Define event handlers before the function that triggers the event
mongoose.connection.on('connected', function() {
  console.log('Yay! connected to database');
});
// function that establishes the connection
mongoose.connect(process.env.MONGODB_URI);

// express application configuration. Give express body-parser functionality
var app = express();
app.use(bodyParser.json()); // .json is saying we are sending data using JSON and parsing it
// when we use req.body it will be expecting JSON files i.e. req.body.fname, req.body.lname
// require in my routes
var apiroutes = require('./apiroutes');
app.use('/api', apiroutes) // tells your express application to use the routes in the routes in the apiroutes file
// '/api' prefixes it in our ./apiroutes file
// start my server
app.listen(3000, function() {
  console.log('Sweet, server is up!');
});
