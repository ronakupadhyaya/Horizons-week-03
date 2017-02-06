var mongoose = require('mongoose');

var token = mongoose.model('token', {
  userId: {
    type: String //_id
  },
  token: {
    type: String //email + date
  },
  createdAt: {
    type: Date //new DatE()
  }
})

module.exports = {
  Token: token
}
