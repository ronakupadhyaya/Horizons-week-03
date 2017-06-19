var mongoose=require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
  fname:String,
  lname:String,
  email:String,
  password:String
  //_id
})
var User = mongoose.model('User', userSchema)

var Token = mongoose.model('Token',{
  userId:String,
  token:String,
  createdAt: Date
})

var Post = mongoose.model('Post',{
    poster: {
      name:String,
      id:String
    },
    content: String,
    likes: Array,
    comments: Array,
    createdAt: Date
    //id
})

module.exports={
  User:User,
  Token:Token,
  Post:Post
}
