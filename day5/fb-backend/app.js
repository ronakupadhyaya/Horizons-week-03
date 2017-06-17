"use strict";
//**Entry point of your application**

//Require all necessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

//Mongoose configuration (connect Mongoose to our database)
mongoose.connection.on('error', function() {
  console.log("Error, could not connect to database.");
});
mongoose.connection.on('connected', function() {
  console.log("Success! Connected to database.");
});
mongoose.connect(process.env.MONGODB_URI);

//Express application configuration
var app = express();
app.use(bodyParser.json()); //we only accept json objects from users in our application

//Require in my routes
var apiroutes = require('./apiroutes');
app.use('/api', apiroutes); //prefixes /api in front of all other routes in apiroutes

//Start my server
app.listen(3000, function() {  //3000 is the port
  console.log("Server is running.");
});
