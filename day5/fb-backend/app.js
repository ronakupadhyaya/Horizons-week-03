"use strict";

var express = require('express');
var mongoose = require('mongoose');


var app = express();

mongoose.connection.on('connected', function() {
  console.log("MongoDB connection successful")
})

mongoose.connect(process.env.MONGODB_URI);


var routes = require('./routes');
app.use('/', routes)

app.listen(process.env.PORT || 3000);
console.log("Server is up and running", "Listening on port 3000")
