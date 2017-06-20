/*******************************************
app.js is the entry point of our application
********************************************/

"use strict";

//require modules
//can see them in node_modules and package.json
var express = require('express');         //server we are going to run on
var bodyParser = require('body-parser');  //makes body of request readable/usable
var mongoose = require('mongoose');       //allows us to interact with MongoDB

//mongoose configuration
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});

mongoose.connection.on('error', function() {
  console.log('Failure: error connecting to MongoDb!');
});

mongoose.connect(process.env.MONGODB_URI);

//express configuration
var app = express();
app.use(bodyParser.json());

//require in routes
var apiroutes = require('./apiroutes');
app.use('/api', apiroutes);

//start server
app.listen(3000, function(){
  console.log("Server is up!");
});
