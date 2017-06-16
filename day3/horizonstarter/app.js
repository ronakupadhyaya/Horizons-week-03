"use strict";

// Express setup
var fs = require('fs');

//creates express object
var express = require('express');

//creates handlebars object
var exphbs  = require('express-handlebars');

//creates path object for navigating file paths
var path = require('path');

//automatically generates HTTP logs
var logger = require('morgan');

//body parser object
var bodyParser = require('body-parser');

//creates validator object
var validator = require('express-validator');

// Initialize Express
var app = express();

// mongoose configuration
var mongoose = require('mongoose');

//if the environment variable file is not found, throw error
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

// Handlabars setup
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

//renders hbs files when res.render is called
app.set('view engine', '.hbs');

//use logger HTTP
app.use(logger('dev'));

// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup express-validator
app.use(validator());

// Read static files in /public
app.use(express.static(path.join(__dirname, 'public')));

// All of our routes are in routes.js
var routes = require('./routes');
app.use('/', routes);

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
