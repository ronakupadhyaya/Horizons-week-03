var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
a schema is the outline for how every docuements in collection should look
a model allows you to create new documents and save them to database
*/

//token model
var tokenSchema = new Schema({
  userId: String,
  token: String,
  createdAt: Date
});
var Token = mongoose.model('Token', tokenSchema);

//post model
var postSchema = new Schema({
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});
var Post = mongoose.model('Post', postSchema);

//user mogel
var userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String
});
var User = mongoose.model('User', userSchema);
/*
makes javascript file into a module that we can import from different files,
we can access files defined in here
*/
module.exports = {
  User: User,
  Token: Token,
  Post: Post
}

// var User = mongoose.model('User', {
//   fname: String,
//   lname: String,
//   email: String,
//   password: String
// });
