var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
  fname: {
    type: String,
    required: true},
  lname: {
    type: String,
    required: true},
  email: {
    type: String,
    required: true},
  password: {
    type: String,
    required: true}
})

var tokenSchema = new Schema({
  userId: {
    type: String,
    required: true},
  token: {
    type: String,
    required: true},
  createdAt: Date
})

var postSchema = new Schema({
  poster: {
    type: Object,
    required: true},
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
})

var Token = mongoose.model('Token',tokenSchema);
var Post = mongoose.model('Post',postSchema);
var User = mongoose.model('User',userSchema);

module.exports = {
  User: User,
  Post: Post,
  Token: Token
}
