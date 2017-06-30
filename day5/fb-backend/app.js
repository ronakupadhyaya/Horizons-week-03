"use strict";

var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var validator = require('express-validator');

var app = express();

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(validator());

app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes');
app.use('/', routes)

app.listen(process.env.PORT || 3000);