var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String
});

var tokenSchema = new Schema({
  userId: String,
  token: String,
  createdAt: Date
});

var postSchema = new Schema({
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});

module.exports = {
  userSchema: userSchema,
  tokenSchema: tokenSchema,
  postSchema: postSchema
};
