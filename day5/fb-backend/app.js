"use strict";

//require all necessary modules
var mongoose = require('mongoose'); //use database
var express = require('express'); //use server
var bodyParser = require('body-parser'); //make body json

//mongoose configuration
mongoose.connection.on('error', function() {
    console.log('COULD NOT CONNECT TO DATABASE');
})

mongoose.connection.on('connected', function() {
    console.log('CONNECTED TO DATABASE');
})

mongoose.connect(process.env.MONGODB_URI);

//express application configuration
var app = express();
app.use(bodyParser.json());

//require in my routes
var apiroutes = require('./apiroutes');
app.use('/api', apiroutes);

//start my server
app.listen(3000, function() {
    console.log('SERVER IS UP');
})