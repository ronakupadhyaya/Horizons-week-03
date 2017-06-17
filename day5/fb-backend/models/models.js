//users, posts, tokens
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String
});

var User = mongoose.model('User', userSchema); //second parameter is always a schema

var Token = mongoose.model('Token', {
  userId: String,
  token: String,
  createdAt: Date
});

var Post = mongoose.model('Post', {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});


module.exports = {
  User: User,
  Token: Token,
  Post: Post
}
