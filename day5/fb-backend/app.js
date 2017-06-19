"use strict";
var User = require('./models/models').User;
var Token = require('./models/models').Token;
var Post = require('./models/models').Post;

// Step 1. require all the necessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

// Step 2.mongoose configuration
mongoose.connection.on('error', function(){
  console.log("Oh no! Could not connect to database")
})
mongoose.connection.on('connected', function(){
  console.log("Yay! Connected to database")
})
mongoose.connect(process.env.MONGODB_URI)

// Step 3.express application configuration
var app = express();
app.use(bodyParser.json())

// Step 4.require in my routes
var apiroutes = require('./apiroutes')
app.use('/api',apiroutes);

// Step 5.start my server
app.listen('3000', function(){
  console.log("server is running");
})
