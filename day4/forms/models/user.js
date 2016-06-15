var mongoose = require('mongoose');

// Write your model schema right here!
var userSchema = mongoose.Schema({
  firstName: String,
  middleInitial: String,
  lastName: String,
  dobMonth: Number,
  dobDay: Number,
  dobYear: Number,
  password: String,
  passwordRepeat: String,
  gender: String,
  newsletter: Boolean,
  bio: String,
  registrationDate: Date
});

module.exports = mongoose.model('User', userSchema);
