"use strict";

// Project model
var mongoose = require('mongoose');

var Token = mongoose.model('Token', {
  userId: String,
  token: String,
  createdAt: Date
});

module.exports = Token;
