/*jslint node: true */
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
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
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: String,
    required: true
  }
});


var tokenSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

var postSchema = new Schema({
  poster: {
    name: String,
    id: String
  },
  content: {
    type: String,
    required: true
  },
  likes: [
    {
      id: String,
      name: String
    }],
  comments: [{
    poster: {
      id: String,
      name: String
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    required: true
  }
});


var User = mongoose.model("User", userSchema);
var Token = mongoose.model("Token", tokenSchema);
var Post = mongoose.model("Post", postSchema);

module.exports = {
  User: User,
  Token: Token,
  Post: Post
};
