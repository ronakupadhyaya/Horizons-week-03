var mongoose = require('mongoose')

// model vs schema
// a schema is an outline/set of rules for how every document should look
// a model allows you to create new documents and save them to document

var Schema = mongoose.Schema

var userSchema = new Schema({
	fname: String,
	lname: String,
	email: String,
	password: String
})

var tokenSchema = new Schema({
    userId: String,
    token: String,
    createdAt: Date
})

var postSchema = new Schema({
    poster: Object,
    content: String,
    likes: Array,
    comments: Array,
    createdAt: Date
})

var User = mongoose.model('User', userSchema)
var Token = mongoose.model('Token', tokenSchema)
var Post = mongoose.model('Post', postSchema)

module.exports = {
	User: User,
	Token: Token,
	Post: Post
}