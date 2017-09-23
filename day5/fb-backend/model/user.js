var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  fname:{
    type: String
  },
  lname:{
    type: String
  },
  email:{
    type: String
  },
  password:{
    type: String
  }
});

module.exports =  mongoose.model('User', UserSchema)
