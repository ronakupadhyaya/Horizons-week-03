var mongoose=require('mongoose'); //require mongoose first before we use it

//an outline for how documents should work, an alternative below

// var Schema = mongoose.Schema
// var userSchema = new Schema({
//   fname: String,
//   lname: String,
//   email: String,
//   password: String
// })
// var User = mongoose.model('User',userSchema)

var User = mongoose.model('User',{ //model adds on collection in database
  fname: String,
  lname: String,
  email: String,
  password: String
})

var Token = mongoose.model('Token',{
  userId: String,
  token: String,
  createdAt: Date
})

var Post = mongoose.model('Post',{
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
})

module.exports = {  //export User so we can access it in other files
//but we need to make other filese navigate to this file location to get it
  User: User,   //left is our own defined key, right side is the var we pass
  Token: Token,
  Post: Post
}
