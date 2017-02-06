var mongoose = require('mongoose');

var post = mongoose.model('posts', {
  poster: {
    type: Object
  },
  content: {
    type: String,
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
})

module.exports = {
  Post: post
}
