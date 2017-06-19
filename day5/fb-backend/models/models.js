var mongoose = require('mongoose'); // USERS, MODELS, and TOKENS models needed

var User = mongoose.model('User', {
  fname: String,
  lname: String,
  email: String,
  password: String
})

var token = mongoose.model('Token', {
  userId: String,
  token: String,
  createdAt: Date
})

var post = mongoose.model('Post', {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
})
// still need two other models here
module.exports = {
  User: User,
  Token: token,
  Post: post
}
