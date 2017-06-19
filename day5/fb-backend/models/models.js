var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// SAME THING AS THE NEXT USER MODEL (SCHEMA IS USUALLY IN DIFFERENT FILE THAT'S IMPORTED)
// Schema is just how each part of collection should look; model allows you to save it to the collection and database.

// var userSchema = new Schema({
//   fname: String,
//   lname: String,
//   email: String,
//   password: String
// })
//
// var User = mongoose.model('User', userSchema);

var Token = mongoose.model('Token', {
  userId: String,
  token: String,
  createdAt: Date
})

var User = mongoose.model('User', {
  fname: String,
  lname: String,
  email: String,
  password: String
})

var Post = mongoose.model('Post', {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
})

module.exports = {
  Token: Token,
  User: User,
  Post: Post
}
