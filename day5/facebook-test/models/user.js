var mongoose = require('mongoose');

var user = mongoose.model('user', {
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  token: {
    type: Object
  }
})

module.exports = {
  User: user
}
