"use strict";

// Project model
var mongoose = require('mongoose');

var Token = mongoose.model('token', {
  userId: {
    type: String
  },
  token: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

var User = mongoose.model('user', {
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
});

var Post = mongoose.model('post', {
  poster: {
    type: Object
  },
  content: {
    type: String
  },
  likes: {
    type: Array
  },
  comments: {
    type: Array
  },
  createdAt: {
    type: Date
  }
});




module.exports = {
  Token: Token,
  User: User,
  Post: Post
}
