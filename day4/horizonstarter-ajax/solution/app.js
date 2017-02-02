"use strict";

// Boring, required stuff
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var handlebars = require('handlebars');

var routes = require('./routes');

/**
 * First construct the main express app. We load the routes (a router object)
 * from routes/.
 *
 * This is our HTML app, which the user will access directly in the browser.
 * It needs a bunch of middleware such as validator, cookieParser, static files
 * etc.
 */

var app = express();

// // Some handlebars helpers
// handlebars.registerHelper('fixId', function(obj) {
//
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session allows us to store data in a session object between HTTP requests.
// It allows us to pass "flash" data between requests, so that we can redirect
// the user and they'll still see the flash message.
// Request requires a "secret" to encrypt the data. It relies on cookies but
// does it all transparently.
app.use(session({secret: 'cutie kitty catz'}));

// All of our main app routes are configured here. (For a more complex app, we
// could split our routes up into multiple route files.)
// NOTE: routes here is an express.Router object.
app.use('/', routes);

/**
 * Next we construct the API app, which is entirely separate from the above
 * user-facing app. It returns JSON and HTTP status codes for AJAX consumption
 * and doesn't need the full set of middleware. It's configured inside api/.
 *
 * NOTE: apiApp here is an express (app) object.
 */

// ALL OTHER REQUESTS which reach this point result in a 404 not found
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

// mongo configuration
var dbConfig = require('./config/db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

module.exports = app;
