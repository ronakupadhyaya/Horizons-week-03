"use strict";

/**
 * AJAX endpoints (API) go here.
 * Mounted as express app inside top-level app at master API endpoint, e.g.,
 * /api/1.
 *
 * NOTE: The way we _consume_ the request (validation, etc.) here is very
 * similar to the way we consume it in the HTML routes in index.js, but the way
 * we structure the response is very different.
 *
 * These hooks DO NOT return HTML since they are not for browser consumption!
 * They return appropriate HTTP status codes and JSON data.
 */

var express = require('express');
var validator = require('express-validator');
var logger = require('morgan');
var bodyParser = require('body-parser');

var Project = require('../model/project');

// Create the (sub) app.
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());



module.exports = app;
