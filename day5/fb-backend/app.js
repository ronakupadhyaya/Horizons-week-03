"use strict";
// all of the routes will come to this file. When a user makes a request,its
//routed to this file

//require all the necessary modules
var mongoose = require('mongoose') //previously we required mongoose in models to get the mongoose model
var express = require('express') //we can use this server
var bodyParser= require('body-parser') //redirect req.body as a json parse

//run mongoose configuration (how do we connect mongoose to the right database)
mongoose.connection.on('error', function(){
  console.log('Oh no! Could not connect to database')
})

mongoose.connection.on('connected',function(){
  console.log('Yay! Connected to database.')
})

mongoose.connect(process.env.MONGODB_URI)

//express application configuration
var app= express()
app.use(bodyParser.json())

// require in my routes
var apiroutes= require('./apiroutes')
app.use('/api',apiroutes)

// start my server

app.listen('3000',function(){
  console.log('Sweet,server is up!')
})
//3000 represents the port
