"use strict";

var mongoose = require('mongoose');

var Token = mongoose.model('Token', {
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
})

module.exports = {
  Token: Token
}
