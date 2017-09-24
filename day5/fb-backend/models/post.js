var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
    poster: Object,
    content: String,
    reactions: {
      type: Array,
      enum: ["like", "happy", "angry", "sad", "love"]
    },
    comments: Array,
    createdAt: Date
});

var Post = mongoose.model('Post', postSchema);

module.exports = {
  Post: Post
}
