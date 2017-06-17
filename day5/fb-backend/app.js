"use strict";
// var module = require('/models.js').User;

//require all the modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

mongoose.connection.on('error', function() {
  console.log('cannot connect to database');
})
mongoose.connection.on('connected', function() {
  console.log('connected successfully');
})
mongoose.connect(process.env.MONGODB_URI);
// mongoose configuration
var app = express();
app.use(bodyParser.json());

// express application configuration
var apiroutes = require('./apiroutes');
app.use('/api', apiroutes);

app.listen(3000, function() {
  console.log('server is up!');
})
// require in my routes

// start server
