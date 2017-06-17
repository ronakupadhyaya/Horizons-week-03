"use strict";

var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

mongoose.connection.on('error', function(){
    console.log('Could not connect to database');
})

mongoose.connection.on('connected', function(){
    console.log('Conected');
})

mongoose.connect(process.env.MONGODB_URI);

var app = express();
app.use(bodyParser.json());

var apiroutes = require('./apiroutes');
app.use('/api', apiroutes);

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});