"use strict";

// token model
var mongoose = require('mongoose');

var post = mongoose.model('token', {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});

module.exports = {
  post: post
}
