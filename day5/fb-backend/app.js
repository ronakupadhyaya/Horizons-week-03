"use strict";
// entry point of the application. It is the
// the server of your applicatiion

// require all the necessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

// mongoose configuration
// eventHandler for lack of connection
mongoose.connection.on('error', function() { // on the specific 'error' event run this function
  console.log('Oh no! Could not connect to the database!');
});

// eventHandler for connection
mongoose.connection.on('connected', function() {
  console.log('Yay! Connected to database.');
});

mongoose.connect(process.env.MONGODB_URI) // establishes connection
// express application configuration
var app = express() // creates application
app.use(bodyParser.json()) // when you do req.bodyParser you only acccept json files

// require in my routes
var apiroutes = require('./apiroutes')
app.use('/api', apiroutes);
// in apiroutes.js file

// start my server
app.listen(3000, function() {
  console.log('Sweet server has woken up!');
})
