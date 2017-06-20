"use strict"
var express = require('express');
var router = express.Router();
var models = require('./models');

var User = models.User;
var Token = models.Token;
var Post = models.Post;

router.get('/', function(req, res) {
  res.send({message: 'hello'})
});

//Registers a user
router.post('/users/register', function(req, res) {
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function(error, user) {
    if (error) {
      res.json({failure: "database error"});
    } else {
      res.json({success: true});
    }
  });
});

//Login for a User, asigns a Token
router.post('/users/login', function(req, res) {
  User.findOne({email: req.body.email, password: req.body.password}, '_id email', function(error, foundUser) {
    if (error) {
      console.log("Error: could not find user");
    } else {
      var date = new Date();
      var newToken = new Token({
        userId: foundUser._id,
        token: foundUser.email + Date.UTC(date.getYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()),
        createdAt: new Date()
      });
      newToken.save(function(error, token) {
        if (error) {
          res.json({error: "Login failed"});
        } else {
          res.json({
            success: true,
            response: {
              id: token.userId,
              token: token.token
            }
          });
        }
      })
    }
  })
});

//Logout a user, and remove Token to prevent further use
router.get('/users/logout', function(req, res) {
  Token.findOneAndRemove({token: req.query.token}, function(error, removedToken) {
    if(error) {
      console.log("Error: error removing token")
    } else if(removedToken) {
      res.json({success: true});
    } else {
      res.json({error: "Failed to logout"});
    }
  });
});

//Displaying the Posts, if specified, display a certain number
router.get('/posts/:page', function(req, res) {
  Token.findOne({token: req.query.token}, function(error, foundToken) {
    if(error) {
      console.log("Error getting posts");
    } else if (foundToken) {
      Post.find(function(error, postArr) {
        if(error) {
          console.log("Error finding posts");
        } else {
          var n = parseInt(req.params.page);
          newPostArr = postArr.slice(10 * (n-1), 10 * n);
          newPostArr.forEach(function(post) {
            responseArr.push({
              "_id": post._id,
              "poster": post.poster,      //poster is an object from post model
              "content": post.content,
              "createdAt": post.createdAt,
              "comments": post.comments,
              "likes": post.likes
            });
          });
          res.json({success: true, response: responseArr});
        }
      });
    } else {
      res.json({error: "Failed to query posts"});
    }
  })
});

//Displaying the Posts, if specified, display a certain number
router.get('/posts/', function(req, res) {
  Token.findOne({token: req.query.token}, function(error, foundToken) {
    if(error) {
      console.log("Error getting posts");
    } else if (foundToken) {
      Post.find(function(error, postArr) {
        if(error) {
          console.log("Error finding posts");
        } else {
          var responseArr = [];
          var newPostArr = postArr.slice(0, 10);
          newPostArr.forEach(function(post) {
            responseArr.push({
              "_id": post._id,
              "poster": post.poster,      //poster is an object from post model
              "content": post.content,
              "createdAt": post.createdAt,
              "comments": post.comments,
              "likes": post.likes
            });
          });
          res.json({success: true, response: responseArr});
        }
      });
    } else {
      res.json({error: "Failed to query posts"});
    }
  })
});

//Post a new post
router.post('/posts', function(req, res) {
  Token.findOne({token: req.query.token}, function(error, foundToken) {
    if(error) {
      console.log("Error posting post");
    } else if (foundToken) {
      //validated
      User.findOne({_id: foundToken.userId}, 'fname lname _id', function(error, foundUser) {
        if (error) {
          console.log("Error finding user");
        } else if (foundUser){
          var newPost = new Post({
            "poster": {
              name: foundUser.fname + " " + foundUser.lname,
              id: foundUser._id
            },      //poster is an object from post model
            "content": req.body.content,
            "createdAt": new Date(),
            "comments": [],
            "likes": []
          });

          newPost.save(function(error, savedPost) {
            if(error) {
              console.log("error saving new post")
            } else {
              res.json({success: true, response: savedPost});
            }
          });
        } else {
          res.json({error: "Token cannot be verified"});
        }
      });
    } else {
      res.json({error: "No post content"});
    }
  });
});

//Get comments on a given post
router.get('/posts/comments/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(error, foundToken) {
    if (error){
      console.log("error with authentication");
    } else if (foundToken){
      Post.findOne({_id: req.params.post_id}, function(error, foundPost) {
        if(error) {
          console.log("error getting comments", error)
        } else if (foundPost) {
          res.json({success: true, response: foundPost.comments})
        } else {
          res.json({error: "Invalid Post ID"});
        }
      })
    } else {
      res.json({error: "Token cannot be  verified"})
    }
  });
});

//post comments on a given post
router.post('/posts/comments/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(error, foundToken) {
    if (error){
      console.log("error with authentication");
    } else if (foundToken){
      Post.findOne({_id: req.params.post_id}, function(error, foundPost) {
        if(error) {
          console.log("error getting comments", error)
        } else if (foundPost) {
          User.findOne({_id : foundToken.userId}, function(error, foundUser) {
            foundPost.comments.push({
              "createdAt": new Date(),
              "content": req.body.content,
              "poster": {
                "name": foundUser.fname + " " + foundUser.lname,
                "id": foundUser._id
              }
            });
            foundPost.save(function(error, savedPost) {
              res.json({success: true, response: savedPost})
            });
          });
        } else {
          res.json({error: "Invalid Post ID"});
        }
      })
    } else {
      res.json({error: "Token cannot be  verified"})
    }
  });
});

//like a given post
router.get('/posts/likes/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(error, foundToken) {
    if (error){
      console.log("error with authentication");
    } else if (foundToken){
      Post.findOne({_id: req.params.post_id}, function(error, foundPost) {
        if(error) {
          console.log("error getting comments", error)
        } else if (foundPost) {
          User.findOne({_id : foundToken.userId}, function(error, foundUser) {
            var likeObj = {name: foundUser.fname + " " + foundUser.lname, id: foundUser._id};
            var index = -1;
            console.log("likeObj", likeObj.id.$oid);
            foundPost.likes.forEach(function(like, i) {
              console.log("like", like.id.$oid);
              if (like.name === likeObj.name) {
                console.log("same")
                index = i;
              }
            });
            if(index >= 0) {
              foundPost.likes.splice(index, 1);
            } else {
              foundPost.likes.push(likeObj);
            }
            foundPost.save(function(error, savedPost) {
              res.json({success: true, response: savedPost})
            });
          });
        } else {
          res.json({error: "Invalid Post ID"});
        }
      })
    } else {
      res.json({error: "Token cannot be  verified"})
    }
  });
});



module.exports = router;
