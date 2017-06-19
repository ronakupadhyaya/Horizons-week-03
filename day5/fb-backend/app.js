// DOCUMENT TO RUN MONGOOSE CONFIG, SERVE OUR ROUTES, START SERVER]
// IS THE ENTRY POINT FOR OUR APPLICATION; OFTEN CALLED SERVER.JS

"use strict";

//require all necessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

//mongoose config: mongoose has an internal error event
//create handlers for connection error and success, then connect to db
mongoose.connection.on('error', function() {
  console.log(":( could not connect to database");
});
mongoose.connection.on('connected', function() {
  console.log(':) connected to database');
});

mongoose.connect(process.env.MONGODB_URI);

//express application config:
// use bodyParser to only accept json objects
var app = express();
app.use(bodyParser.json());

//require in my routes: have in separate file so that separate server
// errors from database errors
var apiroutes = require('./apiroutes');
  //each route prefixed with /api
app.use('/api', apiroutes);

//start my server
app.listen(3000, function() {
  console.log('sick server started smoothly');
})
