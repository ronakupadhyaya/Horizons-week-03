//model in here

"use strict";


var mongoose = require('mongoose');

//first string in model() is the name of that collection in the database
var Post = mongoose.model('Post',
{
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});






module.exports = Post;
