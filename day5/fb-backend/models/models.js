var mongoose = require('mongoose');

var Token = mongoose.model('Token', {
    userId: String,
    token: String,
    createdAt: Date
});

var User = mongoose.model('User', {
  fName: String,
  lName: String,
  email: String,
  password: String
});

var Post = mongoose.model('Post', {
    poster: Object,
    content: String,
    likes: Array,
    comments: Array,
    createdAt: Date
});

module.exports = {
  User: User,
  Token: Token,
  Post: Post
}
