var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String
});

var postSchema = new Schema({
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});

var tokenSchema = new Schema({
  userId: String,
  token: String,
  createdAt: Date
})

var User = mongoose.model('User', userSchema);
var Post = mongoose.model('Post', postSchema);
var Token = mongoose.model('Token', tokenSchema);


module.exports = {
  User: User,
  Post: Post,
  Token: Token
}
