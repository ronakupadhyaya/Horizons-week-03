var mongoose = require('mongoose');

var User = mongoose.model('User', { /// 'user' is the same as the name on the database
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

var Token = mongoose.model('Token', {
  userId: String,
  token: String,
  createdAt: Date
})
module.exports = {
  User: User,
  Token: Token,
  Post: Post


}
// mongoose.connect(process.env.MONGODB_URI);
