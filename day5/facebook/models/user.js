"use strict";

// token model
var mongoose = require('mongoose');

var user = mongoose.model('token', {
    fname: String,
    lname: String,
    email: String,
    password: String,
    token: Object
});

module.exports = {
  user: user
}
