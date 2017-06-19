// users, posts, token
var mongoose = require('mongoose');

var Schema = mongoose.Schema

var userSchema = new Schema ({
  fname: String,
  lname: String,
  email: String,
  password: String
})

var tokenSchema = new Schema ({
  userId: String,
  token: String,
  createdAt: Date
})

var postSchema = new Schema ({
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
})

var User = mongoose.model('User', userSchema)
var Token = mongoose.model('Token', tokenSchema)
var Post = mongoose.model('Post', postSchema)

// var User = mongoose.model('User', {
//   fname: String,
//   lname: String,
//   email: String,
//   password: String
// })
//
// var Token = mongoose.model('Token', {
//   userId: String,
//   token: String,
//   createdAt: Date
// })
//
// var Post = mongoose.model('Post', {
//   poster: Object,
//   content: String,
//   likes: Array,
//   comments: Array,
//   createdAt: Date
// })

module.exports = {
  User: User,
  Token: Token,
  Post: Post
}
