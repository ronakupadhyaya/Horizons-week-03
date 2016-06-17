var mongoose = require('mongoose');

// Write your model schema right here!
var userSchema = mongoose.Schema({
  // YOUR CODE HERE
  firstName: String,
  middleInitial: String,
  lastName: String,
  dobDay: Number,
  dobMonth: Number.
  dobYear: Number,
  password: String,
  gender: Boolean,
  newsletter: Boolean,
  bio: String
});

module.exports = mongoose.model('User', userSchema);
