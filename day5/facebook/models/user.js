var mongoose = require('mongoose');


var User = mongoose.model('User', {

   fname: String,
   lname: String,
   email: String,
   password: String,
   token: Object

 });

module.exports = {
 User: User
}
