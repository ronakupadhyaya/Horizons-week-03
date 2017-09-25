var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: Date
});

var userSchema = new mongoose.Schema({
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
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

var postSchema = new mongoose.Schema({
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});

module.exports = {
  Token: mongoose.model('Token', tokenSchema),
  User: mongoose.model('User', userSchema),
  Post: mongoose.model('Post', postSchema)
}
