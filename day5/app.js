var mongoose = require('mongoose');
var express = require('express');
var fs = require('fs');
var exphbs  = require('express-handlebars');
var path = require('path');
var config = require('./config');
var bodyParser = require('body-parser');
var validator = require('express-validator');

//Intialize Express
var app = express();

var User = require('./models/user').User;
var Token = require('./models/token').Token;
var Post = require('./models/post').Post;

mongoose.connect(config.MONGODB_URI);
//mongoose configuration
mongoose.connection.on('connected', function(){
	console.log('successfully connected')
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine('hbs', exphbs({extname:'hbs'}));
app.set('view engine', 'hbs');


app.post('/api/users/register',function(req,res){
	var user = new User({
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		password: req.body.password
	});
	user.save(function(err){
		if(err){
			res.send(err);
		} else{
			res.json('User is registered');
		}
	})

})

app.post('/api/users/login', function(req,res){
	User.findOne({email: req.body.email}, function(err, found){
		if(found.password === req.body.password){
			var newToken = new Token({
				userId: found._id,
				token: found._id + Date.now(),
				createdAt: Date.now()
			});
			newToken.save(function(err){
				if(err){
					res.send(err);
				} else{
					res.json({message:"Login Successful", token: newToken})
				}
			});
		}
	})
})

app.post('/api/users/logout', function(req, res){
	Token.findOne({token: req.body.token}, function(err, found){
		if(err){
			res.send(err);
		} else {
			found.remove();
			res.json({message: "Logout Successful"})
		}
	});
})

app.post('/api/posts/', function(req,res){
	Token.findOne({token: req.body.token}, function(err,found){
		User.findById(found.userId, function(err,mainpost){
			if(err){
				res.send(err);
			} else{
				var post = new Post({
				poster: {name: mainpost.fname + mainpost.lname, id: mainpost.id} ,
				content: req.body.content,
				likes: [],
				comments: [],
				createdAt: Date.now()
				});
			post.save(function(err){
				if(err){
					res.send(err);
				} else{
				res.json({message: "Post Created", post: post});
			}
		});
			}
			
		})
	});
});

// User.findById(token.userId, function(err, user){
// 			Post.find(function(err,posts){
// 			if(err){
// 			res.send(err);
// 			} else {
// 			res.json(posts);
// 			}
// 		}}
//Login and get the 10 most recent posts after checking for a login token
app.get('/api/posts/', function(req,res){
	Token.findOne({token: req.query.token}, function(err,token){
		if(err){
			res.send(err);
		} else{
			if(token){
				Post.find(function(err,posts){
					if(err){
						res.send(err);
					} else{
						posts.sort(function(a,b){
							return new Date(b.createdAt) - new Date(a.createdAt);
						})
						var recentpost = posts.slice(0,9);

						res.status(200).json({ response:  recentpost
						})
					}
				})
			}
		}
	})
	
})
//Login and get the x most recent posts after checking for a login token
app.get('/api/posts/:x', function(req,res){
	Token.findOne({token: req.query.token}, function(err,token){
		if(err){
			res.send(err);
		} else{
			if(token){
				Post.find(function(err,posts){
					if(err){
						res.send(err);
					} else{
						posts.sort(function(a,b){
							return new Date(b.createdAt) - new Date(a.createdAt);
						})
						var recentpost = posts.slice(0,req.params.x);

						res.status(200).json({ response:  recentpost
						})
					}
				})
			}
		}
	})
})
//Post a comment
app.post('/api/posts/comments/:id', function(req, res){
	Token.findOne({token: req.body.token}, function(err, token){
		User.findById(token.userId, function(err,user){
			Post.findOne({_id: req.params.id}, function(err,posts){
			if(err){
				res.status(400).json(err);
			} else{
				var newComment = {
					createdAt: new Date(),
					content: req.body.content,
					poster: {
						name: user.fname + " " + user.lname,
						id: user.userId
					}
				}
				var comment = posts.comments;
				var finalComment = comment.push(newComment);
				res.status(200).json(posts);
			}

		})
		})
	})	
})
//Get a comment
app.listen(3000)