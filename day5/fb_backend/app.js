"Use strict";
//require all the necessary modules

var mongoose= require('mongoose');
var express=require('express');
var bodyParser=require('body-parser');

//mongoose configuration

mongoose.connection.on('error',function(){
  console.log('Oh no! Could not connect to database')
})

mongoose.connection.on('connected', function(){
  console.log('Yay! You are connected to database')
})

mongoose.connect(process.env.MONGODB_URI)

//express application in configuration

var app= express()

app.use(bodyParser.json())
//require in my routes
var apiroutes=require('./apiroutes')
app.use('/api',apiroutes)
//start my server
app.listen(3000,function(){
  console.log('Sweet, server is up')
})
