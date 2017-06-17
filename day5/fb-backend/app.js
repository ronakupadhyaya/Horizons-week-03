"use strict";

//require all necessary modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
//so that we can read req.body as a json

//run Mongoose configuration
mongoose.connection.on('error', function(){
  console.log("Error: cannot connect to MongoDB.")
})
mongoose.connection.on('connected',function(){
  console.log("Connected to MongoDB")
})

mongoose.connect(process.env.MONGODB_URI);

//express application configuration
var app=express()
app.use(bodyParser.json())

//require in my routes
var apiroutes = require('./apiroutes')
app.use('/',apiroutes);

//start my server
app.listen(3000,function(){
  console.log("Success! Server is up and running.")
})
