"use strict";
//require necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//mongoose config
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDB!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);

//express app config
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//require in my routes
var apiroutes = require('./apiroutes');

app.use('/api', apiroutes);

//start my server
console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
