"use strict";

//require all modules
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

//mongoose configuration (connection mongoose to the database)
mongoose.connection.on('error', function(){
  console.log('Error: could not connect to database.');
}); //this specifies what to do on the error event

mongoose.connection.on('connected', function(){
  console.log('Successfully connected to database.');
}); //define handlers before the function that sends the events (mongoose.connect)

mongoose.connect(process.env.MONGODB_URI);

//express applicaiton configuration (body parser)
var app = express();
app.use(bodyParser.json()); //this parses the body into json objects, which is what we
//will be accepting from users. req.body will expect json to come in.


//require in routes (from router file). Make them seperate so errors don't get mixed up.
var apiroutes = require('./apiroutes');
app.use('/api', apiroutes); //app.use tells your specific express instance to use the specified thing.


//start server. app.js is the thing we run that boots everything up. It should
//contain a bare minimum. This is the entry point to the application.
//Some people call it server.js for that reason.
app.listen(3000, function(){
  console.log('Server is running.');
});





//
