"use strict"

//import from local node module since it was already installed when npm installed
var express = require('express');
var handlebars = require('express-handlebars')
var router = express.Router();

//create express app and initialize it by calling it
//so you can configure how the server will work
var app = express()

var port = process.env.PORT || 3000

//in order to parse the http body request
var bodyParser = require('body-parser')

//tell app to use bodyParser.text()
app.use(bodyParser.text())

//configuration option for parser
app.use(bodyParser.urlencoded({extended : false}))

//handble bars in in charge of hbs files
app.engine('hbs', handlebars())

//tells express app that handle bars is also in charge of html files
app.set('view engine', 'hbs')

//my views are in /views relative to the directory i'm in
app.set('views', __dirname, '/views')

//don't have to use __dirname because it adds it for you
app.use(express.static('public'));

app.get('/hello/:name', function(request, response, next) {
  response.type('text/plain');
  response.send('Hello ' + (request.params.name || 'mystery'))
})

//grab my own code from the echo file located in the current directory
var echo = require('./echo');
//echo is the callback function
//if you go to the exco file, you'll see that it returns the Router
app.use('/echo', echo);

app.get('/form', function(request, response, next) {
  response.render('form');
})

app.get('/hello', function(request, response, next) {
  response.type('text/plain');
  response.send('Hello there ' + (request.query.name || 'blank'));
})
