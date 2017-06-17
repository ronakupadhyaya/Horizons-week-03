var mongoose = require('mongoose')

var Schema = mongoose.Schema

var tokenSchema = new Schema({
  userId: String,
  token: String,
  createdAt: Date
})

var userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String
})

var postSchema = new Schema({
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
})

var Token = mongoose.model('Token',tokenSchema)
var User = mongoose.model('User', userSchema)
var Post = mongoose.model('Post', postSchema)
// your schema is the second argument of your model


module.exports = {
  Token: Token,
  User: User,
  Post: Post
}
