var express = require('express')
var router = express.Router()
var models = require('./models/models')
var User = models.User
var Token = models.Token
var Post = models.Post

router.get('/', function(req, res){
	res.send({
		message: 'hello'
	})
});

router.post("/users/register", function(req, res){
	var newUser = new User({
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		password: req.body.password
	})
	newUser.save(function(err, user){
		if(err){
			res.json({
				failure: "database error"
			})
		}
		else{
			res.json({
				success: true
			})
		}
	})
});

router.post("/users/login", function(req, res){

	User.find({email: req.body.email, password: req.body.password}, function(err, user){
		console.log(user);
		if(err){
			res.send("Error")
		}
		else{
			var newToken = new Token({
				userId: user[0]._id,
				token: user[0].email + new Date(),
				createdAt: new Date()
			})
			newToken.save(function(err, token1){
				if(err){
					res.json({failure: "database error"})
				}
				else{
					res.json({"success": true,
						"response": {
							"id": token1.userId,
							"token": token1.token
						}
					})
				}
			})
		}
	})
});

router.post("/users/logout", function(req, res){
	Token.remove({token: req.body.token}, function (err) {
		if(err){
			res.send("Error")
		}
		else{
			res.json({
				success: true
			})
		}
	})
});

router.get('/posts/', function(req, res){
	Post.find({}, function(err, post){
		if(err){
			throw new Error('could not find page')
		}
		else{
			post.slice(0, 11).forEach(function(post){
				res.json({
				"success": true,
				"response":
				{
					"_id": post._id,
					"poster": {
						"id": post.poster._id,
						"name": post.poster.fname + " " + post.poster.lname
					},
					"content": post.content,
					"createdAt": post.createdAt,
					"comments": post.comments,
					"likes": post.likes
				}
				})
			})
		}
	})
});

router.get('/posts/:page', function(req, res){
	var pagenum = parseInt(req.params.page);

	var start = req.params.page * 10 - 10
	var end = req.params.page * 10 + 1

	Post.find({}, function(err, post){
		if(err){
			throw new Error('could not find page')
		}
		else{
			post.slice(start, end).forEach(function(post){
				res.json({
				"success": true,
				"response":
				{
					"_id": post._id,
					"poster": {
						"id": post.poster._id,
						"name": post.poster.fname + " " + post.poster.lname
					},
					"content": post.content,
					"createdAt": post.createdAt,
					"comments": post.comments,
					"likes": post.likes
				}
				})
			})
		}
	})
});

router.post('/posts', function(req,res){
	var tok = req.body.token;
	Token.find({token: tok}, function(err, token){
		var usrID = token[0].userId;
		User.findById(usrID, function(err,user){
			var newPost = new Post({
				poster: user,
				content: req.body.content,
				likes: [],
				comments: [],
				createdAt: new Date()
			})
			newPost.save(function(err, user){
				if(err){
					res.json({
						failure: "database error"
					})
				}
				else{
					res.json({
						"success": true,
						"response": {
							"poster": {
								"name": newPost.poster.fname + " " + newPost.poster.lname,
								"id": newPost.poster.id
							},
							"content": newPost.content,
							"createdAt": newPost.createdAt,
							"_id": newPost._id,
							"comments": newPost.comments,
							"likes": newPost.likes
						}
					})
				}
			})
		})

	})
});

router.get('/posts/comments/:post_id', function(req,res){
	//var tok = req.body.token;
	var postId = req.params.post_id
	Post.findById(postId, function(err,post){
		if(err){
			throw new Error('could not find post');
		}
		else{
			res.json({
				"success": true,
				"response": post.comments
			})
		}
	})

});

router.post('/posts/comments/:post_id', function(req,res){
	var postId = req.params.post_id;
	var tok = req.body.token;
	Token.find({token: tok}, function(err, token){
		var usrID = token[0].userId;
		User.findById(usrID, function(err,user){
			Post.findById(postId, function(err,post){
				if(err){
					throw new Error('could not find post');
				}
				else{
					post.comments.push(
						{"createdAt": new Date(),
						"content": req.body.content,
						"poster": {
							"name": user.fname + " " + user.lname,
							"id": user._id
						}
					})
					post.save(function(err, user){
						if(err){
							throw new Error('could not save')
						}
						else{
							res.json({
								"success": true,
								"response": {
									"_id": post._id,
									"poster": {
										"id": post.poster._id,
										"name": post.poster.fname + " " + post.poster.lname
									},
									"content": post.content,
									"createdAt": post.createdAt,
									"comments": post.comments,
									"likes": post.likes
								}
							})
						}
					})
				}
			})
		})

	})
});

router.get('/posts/likes/:post_id', function(req,res){
	var postId = req.params.post_id;
	var tok = req.query.token;

	Token.find({token: tok}, function(err, token){
		//console.log(token);
		var usrID = token[0].userId;
		User.findById(usrID, function(err,user){
			Post.findById(postId, function(err,post){
				if(err){
					throw new Error('could not find post');
				}
				else{
					var valueArr = post.likes.map(function(item){ return parseInt(item.id) });
					var isDuplicate = false;
					for(var i = 0; i < valueArr.length - 1; i++){
						if(valueArr[i] === valueArr[i + 1]){
							isDuplicate = true;
						}
					}

					if(!isDuplicate){
						post.likes.push(
						{"name": user.fname + " " + user.lname,
						"id": user._id
						})
					}
					else{
						post.likes.splice(post.likes.indexOf({"name": user.fname + " " + user.lname,
						"id": user._id
						}), 1)
					}

					post.save(function(err, user){
						if(err){
							throw new Error('could not save')
						}
						else{
							res.json({
								"success": true,
								"response": {
									"_id": post._id,
									"poster": post.poster,
									"content": post.content,
									"createdAt": post.createdAt,
									"comments": post.comments,
									"likes": post.likes
								}
							})
						}
					})
				}
			})
		})
	})
});

module.exports = router;
