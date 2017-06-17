"use strict";

//require all the necessary modules
var mongoose = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')

//mongoose configuration
mongoose.connection.on('error',function(){  //connect to mongoose
  //error is the name of the event of mongoose internal setting
  //if 'error' encountered, run the following function
  console.log('Oh no! Coud not connet to database.')
})

mongoose.connection.on('connected',function(){
  console.log('connected successfully!')
})

mongoose.connect(process.env.MONGODB_URI);

//express application configuration
var app = express();
app.use(bodyParser.json()); //only accept json objects from users, default is json, but specify it would be nice
     //just requiring it won't really means it will use it, use app.use!
//require in my routes
var apiroutes = require('./apiroutes')  //./means same directory
app.use('/',apiroutes) //tell the application to use these routes beginning at index default
// app.use('/api',apiroutes) means as soon as url directs to /api, us apiroutes
// app.use('/api',apiroutes) //have to put /api in url

//start my server
app.listen(3000, function(){ //optional function
  console.log('sweet, server is up!')
})  //3000 is the portname the server listens to
