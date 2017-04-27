"use strict";

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
})

var Post2 = mongoose.model('Post', postSchema);

module.exports = {
  Post1: Post2
}
