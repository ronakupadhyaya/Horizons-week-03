var mongoose = require('mongoose');

var tokenModel = mongoose.model('Token', {
  userId: String,
  token: String,
  createdAt: Date,
}, 'token');

var userModel = mongoose.model('User', {
  fname: String,
  lname: String,
  email: String,
  password: String,
}, 'user');

var postModel = mongoose.model('Post', {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date,
});



module.exports = {
  Token: tokenModel,
  User: userModel,
  Post: postModel,
};
