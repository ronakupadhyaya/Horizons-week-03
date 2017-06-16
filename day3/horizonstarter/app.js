"use strict";

// Express setup
var fs          = require('fs'),
    express     = require('express'),
    exphbs      = require('express-handlebars'),
    path        = require('path'),
    logger      = require('morgan'),
    bodyParser  = require('body-parser'),
    validator   = require('express-validator'),
    env         = require("node-env-file"),
    mongoose    = require('mongoose');

env("var.env");

// Initialize Express
var app = express();

mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);

// var hbs = exphbs.create({
//     // Specify helpers which are only registered on this instance.

// });

// Handlabars setup
app.engine('.hbs', exphbs({
  helpers: {
        niceDate: function (uglyDate) { 
          return uglyDate.toDateString(); },
        setDate: function(uglyDate) {
          return uglyDate.toISOString().substr(0, 10);
        }
    },
  defaultLayout: 'main', 
  extname: '.hbs'}));
app.set('view engine', '.hbs');

//Create a custom function helper to check the status.
// exphbs.registerHelper( "niceDate", function ( uglyDate ){
//     console.log("inside helper:)", uglyDate)
//     return uglyDate.toDateString();
// });

app.use(logger('dev'));

// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup express-validator
app.use(validator());

// Read static files in /public
app.use(express.static(path.join(__dirname, 'public')));

// All of our routes are in routes.js
var routes = require('./routes');
app.use('/', routes);

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
