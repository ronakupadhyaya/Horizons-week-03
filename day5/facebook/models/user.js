"use strict";

// Project model
var mongoose = require('mongoose');

var User = mongoose.model('User', {
  fname: String,
  lname: String,
  email: String,
  password: String,
});

module.exports = User;
