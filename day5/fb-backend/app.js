"use strict";

var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
// var logger = require('morgan');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var validator = require('express-validator');
app.use(validator());

var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGODB_URI);
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
// app.use(logger('dev'));
var routes = require('./routes');
app.use('/', routes);
app.get('/', function(req, res) {
  res.send("hi world");
});
console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
