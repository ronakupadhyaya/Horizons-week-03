"use strict";

//order of shit to do:
//require all the necessary modules;
var mongoose = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')


//mongoose configurations...if we have an error, throws console. If we connect to db then
//tell us that we did. Connect to the particular database uri we previosuly set.
mongoose.connection.on('error', function(){
  console.log("Oh no couldn't connect to the database):")
})
mongoose.connection.on('connected', function(){
  console.log('Yay! Connected to database')
})
mongoose.connect(process.env.MONGODB_URI)


//express application configurations...we are only going to be accepting json objects
//just a way to send data
var app = express()
app.use(bodyParser.json())


//require in my routes...send it to the file that actually decides routes
var apiroutes = require('./apiroutes')
app.use(apiroutes)


//start my server
app.listen(3000, function(){
  console.log('Sweet, server is up')
})

//app.js is kinda like server.js...if a user tries to use your application their
//request will be redirected to this
