var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String
});

var tokenSchema = new Schema({
  userId: String,
  token: String,
  createdAt: Date
});

var postSchema = new Schema({
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});

var Token = mongoose.model('Token', tokenSchema);
var User = mongoose.model('User', userSchema);
var Post = mongoose.model('Post', postSchema);

module.exports = {
  Token: Token,
  User: User,
  Post: Post
} //makes a js script into a module, whose properties can be accessed elsewhere.
//no when a file requires in this file, it can access the model by the key 'User'.
