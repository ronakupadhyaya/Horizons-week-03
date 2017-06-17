var mongoose = require('mongoose');
var Schema = mongoose.Schema

var Token = mongoose.model('token', {
    userId: String,
    token: String,
    createdAt: Date,
})

var User = mongoose.model('user', {
    fname: String,
    lname: String,
    email: String,
    password: String,
})

var Post = mongoose.model('post', {
    poster: Object,
    content: String,
    likes: Array,
    comments: Array,
    createdAt: Date,
})

module.exports = {
    User: User,
    Token: Token,
    Post: Post,
}