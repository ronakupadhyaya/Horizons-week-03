var mongoose = require('mongoose');

var User = mongoose.model('User', {
  fname: String,
  lname: String,
  email: String,
  password: String
});

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