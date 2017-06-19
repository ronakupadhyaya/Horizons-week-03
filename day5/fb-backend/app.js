"use strict";

// require all necessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

// run mongoose configuration
mongoose.connection.on('error', function(){
  console.log('No connection to database')
});

mongoose.connection.on('connected', function(){
  console.log('Connection to database is working.')
});

mongoose.connect(process.env.MONGODB_URI);

// express application configuration
var app = express();
app.use(bodyParser.json());

//require in my routes
var apiroutes = require('./apiroutes');
app.use('/api', apiroutes);

//start my server
app.listen(3000, function(){
  console.log('Server is running.')
})
