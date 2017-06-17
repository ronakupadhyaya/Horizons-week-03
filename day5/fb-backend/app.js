"use strict";

//Requiring the proper npm packages that I installed
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

//making a connection to database and printing success or failure
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});


mongoose.connect(process.env.MONGODB_URI);


// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// All of our routes are in routes.js
//prepends /api to all the other routes
var routes = require('./routes');
app.use('/api', routes);

//message to print when the server starts listening
console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
