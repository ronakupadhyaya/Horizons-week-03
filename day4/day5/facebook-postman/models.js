var mongoose = require('mongoose');

var Token = mongoose.model('Token', {
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});


var Post = mongoose.model('Post', {
  poster: {
    type: Object,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: [],
  comments: [
    {
      createdAt: String,
      content: String,
      poster: {
        name: String,
        id: String
      }
    }
  ],
  createdAt: {
    type: Date,
    required: true
  }
});

var User = mongoose.model('User', {
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
});

module.exports = {
  Token: Token,
  Post: Post,
  User: User
}
