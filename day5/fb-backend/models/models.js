// users, posts, tokens

var mongoose = require('mongoose')

// var Schema = mongoose.Schema; // outline for how the collection should look
// var userSchema = newSchema({ // 1st arguments: dataname ,2nd argument: Schema
//     fname: String,
//     lname: String,
//     email: String,
//     password: String
//   });
//
// var User = mongoose.model('User', userSchema)

// Create a model --> create new documents and save it to your database , a model is an instance of a single user
var User = mongoose.model('User', { //1st arguments: collection made uppercase and singular ,2nd argument: Schema
  fname: String,
  lname: String,
  email: String,
  password: String
});

var Token = mongoose.model('Token', {
  userId: String,
  token: String,
  createdAt: Date
});

var Post = mongoose.model('Post', {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});

// makes your javascript file into a module so that other files can import it
module.exports = {
  User: User,
  Token: Token,
  Post: Post
}
