"use strict";

//fs is used in line 18 to make sure we have an env.sh in our directory, to make sure were
//using the correct env variable.
var fs = require('fs');
var express = require('express'); //require express
var exphbs  = require('express-handlebars'); //handlebars
var path = require('path'); //used to import static files, but takes care of potential
//syntax errors on your path/dir name.
//ex. without path: app.use('/static', express.static('public'))
//ex. with path:  app.use(express.static(path.join(__dirname, 'public')));
var logger = require('morgan'); //morgan is only used to print status codes on each request in the console
var bodyParser = require('body-parser');
var validator = require('express-validator');

// Initialize Express
var app = express();

// mongoose configuration
var mongoose = require('mongoose');
//see line 3
if (! fs.existsSync('./env.sh')) {
  throw new Error('env.sh file is missing');
}
if (! process.env.MONGODB_URI) {//check if source env.sh has been run
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function() { //prints when connected
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {//error connecting
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI); //establishes a connection to your database

// Handlabars setup
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev')); //logs status code responses on each request (red for error codes green for 2XX)

// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup express-validator
app.use(validator());

// Read static files in /public
app.use(express.static(path.join(__dirname, 'public')));

// All of our routes are in routes.js
var routes = require('./routes');
app.use('/api', routes); //all routes will have /api infront, so dont have to put /api in urls in routes
//prints on success
console.log('Express started. Listening on port', process.env.PORT || 3000);



//listens on a specificed port in env variables, or defaults to 3000 if none specified
app.listen(process.env.PORT || 3000);
