var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User',{
  fname: String,
  lname: String,
  email: String,
  password: String,
  token: {
    type: Schema.ObjectId,
    ref: 'tokens'
  }
});

module.exports = User;
