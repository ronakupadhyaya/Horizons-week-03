var mongoose = require('mongoose');

var Token = mongoose.model('token', {
  userId: String,
  token: String,
  createdAt: Date
})

var User = mongoose.model('user', {
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

var Post = mongoose.model('post', {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
})

module.exports = {
  Token: Token,
  User: User,
  Post: Post
};