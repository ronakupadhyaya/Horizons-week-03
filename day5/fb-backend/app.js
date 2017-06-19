"use strict"; //entry point of application.

//require all neccessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

//mongoose configuration
mongoose.connection.on('error', function() {      //define event handlers before connect
  console.log('Oh no! Could not connect to database');
})

mongoose.connection.on('connected', function() {
  console.log('Yay! Coonected to database!');
})

mongoose.connect(process.env.MONGODB_URI); //establish connection to database


//express application configuration
var app = express();
app.use(bodyParser.json()); //to explicitly say we want to accept json info from bodyParser

//require in my routes
var apiroutes = require('./apiroutes'); //./ means same folder
app.use('/api', apiroutes);  //tell instance of express to use apiroutes; api is the prefix so routes does not have to say api each time
//start my server
app.listen(3000, function() {
  console.log('Sweet, server is up!');
})
