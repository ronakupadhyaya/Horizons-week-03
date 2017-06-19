"use strict";

// require all necessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

// connect mongoose to the database
mongoose.connection.on('error', function(){
  console.log('You fucked up - could not connect to database');
});

mongoose.connection.on('connected', function(){
  console.log('Successfully connected to mongoDB');
});

mongoose.connect(process.env.MONGODB_URI);

// express application configurations
var app = express();
app.use(bodyParser.json());

// require in my routes
var apiroutes = require('./apiroutes');
app.use('/api', apiroutes);

// start my server
app.listen(3000, function(){
  console.log('Connected to port 3000');
});
