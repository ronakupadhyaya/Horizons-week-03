var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  poster: { type: Object, required: true },
  content: { type: String, required: true },
  likes: { type: Array},
  comments: { type: Array},
  createdAt: { type: Date, required: true }
});

module.exports = Post;
