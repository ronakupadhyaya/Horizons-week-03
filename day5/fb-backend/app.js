"use strict";
// ENTRY POINT

// require packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to mongodb via mongoose
mongoose.connection.on('error', function(){
  console.log("OH DANG IT! COULDN'T CONNECT TO DATABASE");
});
mongoose.connection.on('connected', function(){
  console.log('YESSSS YOU DID IT, DATABASE IS CONNECTED');
});
mongoose.connect(process.env.MONGODB_URI);

// express configuration
var app = express();
app.use(bodyParser.json());                           // parse req.body contents
app.use(bodyParser.urlencoded({extended: true}));

// require router
var routes = require('./routes');
app.use('/api', routes);

// start server
app.listen(3000, function(){
  console.log("YAYYYYY SERVER IS UP =)");
});


// require all the necessary modules
// mongoose configuration
// express application configuration
// require in my routes
// start my server
