"use strict";


var path = require('path');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var validator = require('express-validator');

var app = express();

var mongoose = require('mongoose');

if (!fs.existsSync('./env.sh')) {
  throw new Error('env.sh file is missing');
}
if (!process.env.MONGODB_URI) {
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

// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Setup express-validator
app.use(validator());

// Read static files in /public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
var routes = require('./routes');
app.use('/', routes);

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
