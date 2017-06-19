"use strict";

// require all necessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser')

// mongoose configurations
mongoose.connection.on('error', function() {
  console.log('Oh no! Could not connect to database.');
});

mongoose.connection.on('connected', function(){
  console.log('Yay! Connected to database.');
});

mongoose.connect(process.env.MONGODB_URI);

// express application configuration -->
var app = express();
app.use(bodyParser.json());

// require in the routes
var apiroutes = require('./apiroutes')
app.use('/api', apiroutes)

// start server at the end
app.listen(3000, function(){
  console.log('Sweet, server is up!');
});
