"use strict";

// this document creates our server. In fact, some people call
// this document server.js instead of app.js

// require all the neccessary modules
var mongoose = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')

// mongoose configuration
mongoose.connection.on('error', function() {
  console.log('Oh no! Could not connect to database.')
})

mongoose.connection.on('connected', function() {
  console.log('Yay! Connected to database.')
})

mongoose.connect(process.env.MONGODB_URI)

// express application configuration
var app = express();
app.use(bodyParser.json())

//require in my routes
var apiroutes = require('./apiroutes')
app.use('/api', apiroutes)

// start my server
app.listen(3000, function(){
  console.log("Sweet! Server is up!")
})
