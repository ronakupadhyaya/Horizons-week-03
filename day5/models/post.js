"use strict";

var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  poster: {name: String, id: String},
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
})


module.exports = {
  Post: Post
}
