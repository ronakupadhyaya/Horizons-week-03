"use strict";
//require the necessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

//mongoose configuration
mongoose.connection.on('error', function(){
  console.log('~~~~~~~Could not connect~~~~~~~~~');
});

mongoose.connection.on('connected', function(){
  console.log("YAY! Connected!");
});

// connect to database
mongoose.connect(process.env.MONGODB_URI);

//express applicatin configuration
var app = express();
app.use(bodyParser.json()); //accepts json object from user

//require in my routes
var apiroutes = require('./apiroutes');
app.use('/api', apiroutes); // /api is prefixed

//start my server
app.listen(3000, function() {
  console.log('Sweet, server is up')
});
// console.log('Express started. Listening on port', process.env.PORT || 3000);
// app.listen(process.env.PORT || 3000);
