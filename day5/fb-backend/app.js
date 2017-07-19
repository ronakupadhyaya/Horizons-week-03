/*jslint node: true */
"use strict";

//require all the necessary modules
var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");

//mongoose configuration
// mongoose.connection.on("error", function() {
//   console.log("Oh no! Could not connect to database.");
// });
//
// mongoose.connection.on("connected", function() {
//   console.log("Connected to database.");
// });

var app = express();

mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});

mongoose.connect(process.env.MONGODB_URI);

if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
//express application configuration

app.use(bodyParser.json());

//require in my routes
var apiroutes = require("./apiroutes");
app.use("/api", apiroutes);


//start my server
app.listen(3000, function() {
  console.log("Server is running...");
});
