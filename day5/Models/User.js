var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String
})

var User2 = mongoose.model('User', userSchema);

module.exports = User2
