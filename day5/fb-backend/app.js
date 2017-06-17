"use strict";

var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var validator = require('express-validator');

var app = express();

var mongoose = require('mongoose');

console.log(process.env.MONGODB_URI);
if (!fs.existsSync('./env.sh')) {
  throw new Error('env.sh file is missing');
}
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function () {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function () {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);


app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');


// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Setup express-validator
app.use(validator());

// All of our routes are in routes.js
var routes = require('./routes');
app.use('/', routes);

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
