var mongoose = require('mongoose')

// if we wanted to run it with schemas...schema is just hte setup for how the model works
// but it cannot be used to create new things that interact with the database
// var Schema = mongoose.Schema
// var userSchema = new Schema({
//   fname: String,
//   lname: String,
//   email: String,
//   password: String
// }}
// var user = mongoose.model('user', userSchema)

var user = mongoose.model("user", {
  fname: String,
  lname: String,
  email: String,
  password: String
})

// var posts = mongoose.model("posts", {
//   fname: String,
//   lname: String,
//   email: String,
//   password: String
// })
//
// var tokens = mongoose.model("tokens", {
//   fname: String,
//   lname: String,
//   email: String,
//   password: String
// })


module.exports = {
  user: user//,
  // posts: posts,
  // tokens: tokens
}
