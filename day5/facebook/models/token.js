"use strict";

// token model
var mongoose = require('mongoose');

var token = mongoose.model('token', {
    userId: String,
    token: String,
    createdAt: Date
});

module.exports = {
  token: token
}
