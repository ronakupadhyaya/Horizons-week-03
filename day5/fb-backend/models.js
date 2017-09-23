"use strict";

// Project model
var mongoose = require('mongoose');

var Token = mongoose.model('Token', {
  userid: String,
  token: String,
  createdAt: Date
});
var User = mongoose.model('User', {
  fname: String,
  lname: String,
  email: String,
  password: String
});
var Post = mongoose.model('Post', {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});

module.exports = {
  Token: Token,
  User: User,
  Post: Post
}
