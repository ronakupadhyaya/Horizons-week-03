var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tokenSchema = new Schema ({
    userId: String,
    token: String,
    createdAt: Date
});

var userSchema = new Schema ({
  fname: String,
  lname: String,
  email: String,
  password: String
});

var postSchema = new Schema ({
    poster: Object,
    content: String,
    likes: Array,
    comments: Array,
    createdAt: Date
});

var Token = mongoose.model('Token', tokenSchema);
var User = mongoose.model('User', userSchema);
var Post = mongoose.model('Post', postSchema);


module.exports = { //makes JS file into a module that we can import from somewhere else and we can access these
  User: User,
  Token: Token,
  Post: Post
}
