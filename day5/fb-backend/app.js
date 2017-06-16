"use strict";

// Express setup
var fs = require('fs');
var express = require('express');
//api server doesn't use handlebars
// var path = require('path');
// var logger = require('morgan');
var bodyParser = require('body-parser');
var validator = require('express-validator');

// Initialize Express
var app = express();

// mongoose configuration
var mongoose = require('mongoose');

if (! fs.existsSync('./env.sh')) {
  throw new Error('env.sh file is missing');
}
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});

mongoose.connect(process.env.MONGODB_URI);

// app.set('view engine', '.hbs');


// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var apiroutes = require('./apiroutes')
// Setup express-validator
app.use(validator());
app.use('/api',apiroutes)

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
