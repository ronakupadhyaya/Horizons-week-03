var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({
  userId: String,
  token: String,
  createdAt: Date
})

var Token2 = mongoose.model('Token', tokenSchema);

module.exports =  {
  Token1: Token2
}
