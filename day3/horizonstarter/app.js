"use strict";

// Express setup
var fs = require('fs');
var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var validator = require('express-validator');

// Initialize Express
var app = express();

// mongoose configuration
var mongoose = require('mongoose');

if (! fs.existsSync('./config.js')) {
  throw new Error('config.js file is missing');
}
var config = require('./config');
if (! config.MONGODB_URI) {
  throw new Error('MONGODB_URI is missing in file config.js');
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in config.js');
  process.exit(1);
});
mongoose.connect(config.MONGODB_URI);

// Handlabars setup
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));

// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup express-validator
app.use(validator({

	customValidators: {
    gte: function(param, num) {
        return param >= num;
    },
    isOneLetter: function(param){

      return param.length === 1;

    },
    isBetween: function(param, first, last){

      if(param <= last && param >= first) return true;

      return false;
    },
    equalTo: function(param1, param2){
      return param1 === param2;
    }

 }

}));

// Read static files in /public
app.use(express.static(path.join(__dirname, 'public')));

// All of our routes are in routes.js
var routes = require('./routes');
app.use('/', routes);

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
