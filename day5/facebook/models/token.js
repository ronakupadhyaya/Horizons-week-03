var mongoose = require('mongoose');
var Token = mongoose.model('Token', {
  userId: {
    type: String
  },
  token: {
    type: String
  },
  createdAt: {
    type: String
  }
});
module.exports = {
  Token: Token
}
