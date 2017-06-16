var mongoose = required('mongoose');

// Schemas: The outline of how every single document should look
var Schema = mongoose.Schema

var userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String
})
// Models: pass the schema as an argument after building schema
// Using User refers to the user's collection
var User = mongoose.model('User', userSchema);

// Can also be defined without a Schema, as below:
var User = mongoose.model('User', {
  fname: String,
  lname: String,
  email: String,
  password: String
})

module.exports = {
  User: User
}
