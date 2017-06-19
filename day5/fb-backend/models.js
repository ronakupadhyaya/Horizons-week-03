var mongoose = require('mongoose');

var Schema = mongoose.Schema
//outline for how every document in the collection should look
//schema is second argument for User
var userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String
});

var User = mongoose.model('User', userSchema);
//model allows document creation & for us to save it

var tokenSchema = new Schema({
  userId: String,
  token: String,
  createdAt: Date
});

var Token = mongoose.model('Token', tokenSchema);

var postSchema = new Schema({
    poster: Object,
    content: String,
    likes: Array,
    comments: Array,
    createdAt: Date
});

var Post = mongoose.model('Post', postSchema);



module.exports = {
  User: User,
  Token: Token,
  Post: Post,
}
