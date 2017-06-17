"use strict";

//1) require all the necessary models
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

//2) mongoose configuration --> specify events we want to handle
mongoose.connection.on('error', function() {
  console.log('Oh no! Could not connect to DB');
});
mongoose.connection.on('connected', function() {
  console.log('Yay! Connected to DB');
});
mongoose.connect(process.env.MONGODB_URI); //establish connection to database

//3) express application configuration
var app = express(); //create application
app.use(bodyParser.json()); //use bodyParser so that we can read req.body, only accepting json objs from users
//another line?

//4) require in my routes
var apiroutes = require('./apiroutes'); // './' means in the same directory
app.use('/api', apiroutes);

//5) start my server
app.listen(3000, function() {
  console.log('Sweet! server is up!');
});
