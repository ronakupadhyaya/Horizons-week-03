"use strict";

// Express setup
var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var mongoose = require('mongoose');

mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);

// Handlebars setup
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));

// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read static files in /public
app.use(express.static(path.join(__dirname, 'public')));

// All of our routes are in routes.js
var routes = require('./routes');
app.use('/', routes);

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);