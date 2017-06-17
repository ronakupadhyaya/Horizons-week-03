var mongoose = require('mongoose');

// import schemas
var schemas = require('../schemas/schemas');

// model (name, object)
var User = mongoose.model('User', schemas.userSchema);
var Post = mongoose.model('Post', schemas.postSchema);
var Token = mongoose.model('Token', schemas.tokenSchema);

module.exports = {
  User: User,
  Post: Post,
  Token: Token
}
