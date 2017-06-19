// could also be server.js
//this is the entry point of your application
'use strict';

// require all the necessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser')

// mongoose configuration
mongoose.connection.on('error', function(){
  console.log('Oh NO - cant connect to database')
})
mongoose.connection.on('connected', function(){
  console.log('Yay! Connected to database')
})

mongoose.connect(process.env.MONGODB_URI)

//express application configuration
var app = express()
app.use(bodyParser.json())

// require in my Routes
var apiroutes = require('./apiroutes')
app.use('/api', apiroutes)

// start my server
app.listen(3000, function(){
  console.log("Sweet! Server is up!")
})
