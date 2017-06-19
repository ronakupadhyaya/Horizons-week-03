"use strict";
//this is the entry point for using the application!

//require necessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

//run mongoose configuration
mongoose.connection.on('error', function(){
  console.log('Could not connect to database');
})
mongoose.connection.on('connected', function(){
  console.log('Successfully connected to mongoDB!');
})
mongoose.connect(process.env.MONGODB_URI);

//run express & express-validator application configuration
var app = express();
app.use(bodyParser.json());
// app.use(expressValidator());

//do we want express-validator?

//require routes
var apiroutes = require('./apiroutes');
app.use('/api', apiroutes);

//start my server
app.listen(3000, function(){
  console.log('Up and running');
});
