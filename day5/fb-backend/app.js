"use strict";

// GENERAL SET UP GUIDE

// – read the readme
// – look at the files we have
// – think ahead -> npm installs
// 	– mongoose, express, body-parser
// 	– the node_modules folder

// – set up of mongoose
// 	– head to mlab
// 	– env.sh mongo uri
// 	– mongoose directory
// 		– models files
// 			– user
// 	– require mongoose in appjs
// – make apiroutes.js -> hit up the app.use(apiroutes)


// STEPS TO SET UP APP.JS FILES  (This is the entry point of the application)

// require all the necessary modules

var mongoose = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')

// mongoose configuration

mongoose.connection.on('error', function(){
	console.log('Something went wrong. Could not connect to the database')
})

mongoose.connection.on('connected', function(){
	console.log('Successfully connected to the database')
})

mongoose.connect(process.env.MONGODB_URI)

// express application configuration

var app = express()
app.use(bodyParser.json())

// require in my routes

var apiroutes = require('./apiroutes')
app.use('/api', apiroutes)

// start my server

app.listen(3000, function() {
	console.log('The server is up and running!')
})