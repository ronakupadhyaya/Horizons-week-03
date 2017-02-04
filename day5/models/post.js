var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});

module.exports = Post;
