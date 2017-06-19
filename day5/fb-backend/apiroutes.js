var express = require('express')
var router = express.Router()
var models = require('./models/models')
var User = models.User;
var Token = models.Token;
var Post = models.Post;

router.get('/', function(req, res){
	res.send({message: 'hello'})
})

router.post('/users/register', function(req, res){
	var newUser = new User ({
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		password: req.body.password
	});
	newUser.save(function(err, usr){
		if (err) {
			res.json({failure: "Database error — Please try again"})
		} else {
			res.json({success: true})
		}
	})
})

router.post('/users/login', function(req, res){
	User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
		if (!user) {
			res.json({failure: "Login failed. — One or more of your authentication details was incorrect. Make sure you are sending the correct email and password you set upon registration and that these values are defined."})
		} else {
			var userToken = req.body.email + new Date()
			var newToken = new Token ({
				token: userToken,
				userId: user._id,
				createdAt: new Date()
			})
			newToken.save(function(err, token){
				if (err) {
					res.json({failure: "Login failed. — One or more of your authentication details was incorrect. Make sure you are sending the correct email and password you set upon registration and that these values are defined."})
				} else {
					res.json({
						success: true,
						response: {
							userId: user._id,
							token: userToken
						}
					})
				}
			})
		}
	})
})

router.get('/users/logout', function(req, res){
	Token.findOneAndRemove({token: req.query.token}, function(err){
		if (err) {
			res.json({failure: "Logout failed — Please try again."})
		} else {
			res.json({success: true})
		}
	})
})

router.post('/posts', function(req, res){
	Token.findOne({token: req.body.token}, function(err, token) {
		if (!token) {
			res.json({failure: "You are not logged in — Please try again."})
		} else {
			User.findById(token.userId, function(err, user){
				var newPost = new Post ({
					poster: {
						name: user.fname + " " + user.lname,
						id: token.userId
					},
					content: req.body.content,
					likes: [],
					comments: [],
					createdAt: new Date()
				})
				newPost.save(function(err, post){
					if (err) {
						res.json({failure: "Failed to post — Please try again."})
					} else {
						res.json({
							success: true,
							response: post
						})
					}
				})
			})
		}
	})
})

router.get('/posts', function(req, res){
	Token.findOne({token: req.query.token}, function(err, token) {
		if (!token) {
			res.json({failure: "You are not logged in — Please try again."})
		} else {
			Post.find().limit(10).exec(function(err, post) {
				if (err) {
					res.json({error: "Failed to retrieve posts — Please try again."})
				} else {
					res.json({
						success: true,
						response: post
					})
				}
			})
		}
	})
})

// get posts/:page
// var page = req.params.page - 1
// Post.find().limit(10).skip(10*page)

module.exports = router