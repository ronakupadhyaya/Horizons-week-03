var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  poster: {
  	type: Object,
  	required: true
  },
  content: {
  	type: String,
  	required: true
  },
  likes: {
  	type: Array,
  	// required: true
  },
  comments: {
  	type: Array,
  	// required: true
  },
  createdAt: {
  	type: Date,
  	required: true
  }
});

module.exports = {
	Post: Post
 }
