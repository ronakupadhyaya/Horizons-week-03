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
  throw new Error('config.js is missing');
}
var config = require('./config');
if (! config.mongoUrl) {
  throw new Error('mongoUrl is missing in config.js');
}
mongoose.connect(config.mongoUrl);

// Handlabars setup
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(express.static(path.join(__dirname, 'public')));

// All of our routes are in routes.js
var routes = require('./routes');
app.use('/', routes);

// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(process.env.PORT || 3000);
