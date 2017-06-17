var mongoose = require('mongoose');

//**Constructing models with schemas, can have models in one file and schemas in another file
var Schema = mongoose.Schema;
var userSchema = new Schema ({
  fname: String,
  lname: String,
  email: String,
  password: String
});
var User = mongoose.model('User', userSchema);

var tokenSchema = new Schema ({
    userId: String,
    token: String,
    createdAt: Date
});
var Token = mongoose.model('Token', tokenSchema);

var postSchema = new Schema ({
    poster: Object,
    content: String,
    likes: Array,
    comments: Array,
    createdAt: Date
});
var Post = mongoose.model('Post', postSchema);

//Creating model and schema together
// var User = mongoose.model('User', {
//   fname: String,
//   lname: String,
//   email: String,
//   password: String
// });

module.exports = { //allows you to be able to access in other files
  User: User,
  Post: Post,
  Token: Token
}
