"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema( {
  fname: String,
  lname: String,
  email: String,
  password: String
});

var User = mongoose.model('User', userSchema); //model is instance of single user
//singular version of name of collection in mongodb. users --> user

var TokenSchema = new Schema( {
  fname: String,
  lname: String,
  email: String,
  password: String
});

var Token = mongoose.model('Token', TokenSchema);

var PostSchema = new Schema( {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});

var Post = mongoose.model('Post', PostSchema);

module.exports = {
  User: User,
  Token: Token,
  Post: Post
};
