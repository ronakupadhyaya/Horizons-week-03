"use strict";

//require all the necessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var env = require("node-env-file");

env("var.env");

//mongose configuration
mongoose.connection.on('error', function(){
  console.log('Oh no! Could not coonect to database.')
});

mongoose.connection.on('connected', function(){
  console.log('Yay! connected to database.')
});

mongoose.connect(process.env.MONGODB_URI);

//express application configuration
var app = express();
app.use(bodyParser.json());

//require in my routes
var apiroutes = require('./apiroutes');
app.use('/api', apiroutes);

//start my server
app.listen(3000, function(){
  console.log('Sweet, server is up!')
});