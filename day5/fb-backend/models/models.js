var mongoose = require('mongoose')

var Schema = mongoose.Schema

var userSchema = new Schema({
  fname: String,
  lname: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String
})

var tokenSchema = new Schema({
  userId: String,
  token: String,
  createdAt: Date
})

var postSchema = new Schema({
  poster: Object,
  content: {
    type: String,
    required: true
  },
  likes: Array,
  comments: Array,
  createdAt: Date
})

var User = mongoose.model('User', userSchema);
var Token = mongoose.model('Token', tokenSchema);
var Post = mongoose.model('Post', postSchema);

// another way
// var User = mongoose.model('User', {
//   fname: String,
//   lname: String,
//   email: String,
//   password: String
// })

module.exports = {
  User: User,
  Token: Token,
  Post: Post
}
