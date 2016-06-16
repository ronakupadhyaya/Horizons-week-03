var mongoose = require('mongoose');

// Write your model schema right here!
var userSchema = mongoose.Schema({
  // YOUR CODE HERE
  firstName: String,
  middleInitial: String,
  lastName: String,
  dobMonth: Number,
  dobDay: Number,
  dobYear: Number,
  password: String,
  gender: String,
  newsletter: String,
  bio: String
});

module.exports = mongoose.model('User', userSchema);
