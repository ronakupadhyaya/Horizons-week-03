
var mongoose = require("mongoose");

var tokenSchema = {
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
};

var userSchema = {
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
};

var postSchema = {
  poster: {
    id: String,
    name: String
  },

  content: {
    type: String,
    required: true,
  },

  likes: [{
    id: String,
    name: String
  }],

  comments: [{
      user: {
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

};

var Token = mongoose.model("Token", tokenSchema);
var User = mongoose.model("User", userSchema);
var Post = mongoose.model("Post", postSchema)

module.exports = {
  Token: Token,
  User: User,
  Post: Post
};
