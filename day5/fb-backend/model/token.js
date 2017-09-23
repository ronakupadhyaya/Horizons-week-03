var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
  userId:{
    type: String
  },
  token:{
    type: String
  },
  createdAt:{
    type: Date
  }
});

module.exports =  mongoose.model('Token', TokenSchema)
