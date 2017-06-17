"use strict";
 // require everything necessary
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

//mongoose configuration
mongoose.connection.on('error', function() {
  console.log('Error connecting to database');
})
mongoose.connection.on('connected', function() {
  console.log('Successfully connected to MongoDB');
})
mongoose.connect(process.env.MONGODB_URI);

//express application configuration
var app = express();
app.use(bodyParser.json());

// require in my routes
var apiroutes = require('./apiroutes');
app.use('/api', apiroutes)

// start the server
app.listen(3000, function() {
  console.log('Server is running at port 3000')
})
