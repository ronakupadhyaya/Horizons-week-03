"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Post = require('./models/post').Post1;
var Token = require('./models/token').Token1;
var User = require('./models/user');

//REGISTER NEW USER
router.post('/api/users/register', function(req, res) {
  var user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err) {
    if(err) {
      res.status(400).json(err);
    } else {
      res.json({
        message: "Success: created a User object in MongoDb",
        user: user
      });
    }
  });
});

//LOGIN AND CREATE TOKEN
router.post('/api/users/login', function(req, res) {
  User.findOne({email: req.body.email}, function(err, found) {
    if(err) {
      res.status(301).json(err);
      res.redirect('/login');
    } else {
      var token = new Token({
        userId: found._id,
        token: req.body.email + new Date(),
        createdAt: new Date()
      })
      token.save(function(err) {
        if(err) {
          res.status(400).json(err);
        } else {
          res.json({
            message: "Success: created a Token object in MongoDb",
            token: token
          })
        }
      })
      res.json({
        success: true,
        token: token
      })
    }
  })
})

router.get('/api/users/login', function(req, res) {
  res.status(401).json({error: "Login failed."})
})

router.get('/api/posts/error', function(req, res) {
  res.status(401).json({error: "Action not allowed. Please authenticate."})
})

//POSTING A POST
router.post('/api/posts', function(req, res) {
  Token.findOne({token:req.body.token}, function(err, tokenObject) {
    if(err) {
      res.json({error: "Token error."})
    } else {
      User.findById(tokenObject.userId, function(err, userObject) {
        if(err) {
          res.json({error: "User error."})
        } else {
          var post = new Post({
            poster: {
              name: userObject.fname + " " + userObject.lname,
              id: userObject._id
            },
            content: req.body.content,
            createdAt: new Date(),
            likes: [],
            comments: []
          });
          post.save(function(err) {
            if(err) {
              res.json({error: "Post not saved!"});
            } else {
              res.json({
                success: true,
                response: post
              })
            }
          });
        }
      })
    }
  });
})

//GETTING POSTS
router.get('/api/posts', function(req, res) {
  Post.find().sort('-createdAt').limit(10).exec(function(err, posts) {
    if(err) {
      res.json({error: "Couldn't get posts"})
    } else {
      var responseArray = [];
      for(var i = 0; i < posts.length; i++) {
        responseArray.push({
          _id: posts[i]._id,
          poster: posts[i].poster,
          content: posts[i].content,
          createdAt: posts[i].createdAt,
          comments: posts[i].comments,
          likes: posts[i].likes
        })
      }
      res.json({
        success: true,
        response: responseArray
      })
    }
  });
})

router.get('/api/posts/:numberOfPosts', function(req, res) {
  Post.find().sort('-createdAt').exec(function(err, posts) {
    if(err) {
      res.json({error: "Couldn't get posts"})
    } else {
      var responseArray = [];
      for(var i = 0; i < posts.length; i++) {
        responseArray.push({
          _id: posts[i]._id,
          poster: posts[i].poster,
          content: posts[i].content,
          createdAt: posts[i].createdAt,
          comments: posts[i].comments,
          likes: posts[i].likes
        })
      }
      console.log(responseArray);
      console.log(responseArray.length);
      res.json({
        success: true,
        response: responseArray.splice(((req.params.numberOfPosts - 1) * 10), 10)
      })
    }
  });
})

router.get('/api/posts/comments/:id', function(req, res) {
  Post.findOne({_id:req.params.id}, function(err, postObject) {
    if(err) {
      res.json({error: "Couldn't find post"})
    } else {
      res.json({
        success: true,
        response: postObject.comments
      })
    }
  })
})

router.post('/api/posts/comments/:id', function(req, res) {
  Post.findOne({_id:req.params.id}, function(err, postObject) {
    if(err) {
      res.json({error: "Couldn't find post"})
    } else {
      Token.findOne({token:req.body.token}, function(err, tokenObject) {
        if(err) {
          res.json({error: "Couldn't find token"})
        } else {
          User.findOne({_id:tokenObject.userId}, function(err, userObject) {
            if(err) {
              res.json({error: "Couldn't find user"})
            } else {
              postObject.comments.push({
                createdAt: new Date(),
                content: req.body.content,
                poster: {
                  name: userObject.fname + " " + userObject.lname,
                  id: userObject._id
                }
              })
            }
            postObject.save(function(err) {
              if(err) {
                res.json({error: "Post not saved"})
              } else {
                res.json({
                  success: true,
                  response: postObject.comments
                })
              }
            })
          })
        }
      })
    }
  })
})

router.get('/api/posts/likes/:id', function(req, res) {
  Post.findOne({_id:req.params.id}, function(err, postObject) {
    if(err) {
      res.json({error: "Couldn't find post"})
    } else {
      Token.findOne({token:req.query.token}, function(err, tokenObject) {
        if(err) {
          res.json({error: "Couldn't find token"})
        } else {
          User.findOne({_id:tokenObject.userId}, function(err, userObject) {
            if(err) {
              res.json({error: "Couldn't find user"})
            } else {
              //TODO: FINISH THIS BULLSHIT
              var filtered = [];
              for(var i = 0; i < postObject.likes.length; i++) {
                if(postObject.likes[i].name === userObject._id) {
                  filtered.push(postObject.likes[i]);
                }
              }
              console.log(filtered);
              if(filtered.length === 0) {
                postObject.likes.push({
                  id: userObject._id,
                  name: userObject.fname + " " + userObject.lname
                })
              } else {
                for(var i = 0; i < postObject.likes.length; i++) {
                  if(postObject.likes[i].name === userObject._id) {
                    postObject.likes.splice(i, 1);
                  }
                }
              }
              postObject.save(function(err) {
                if(err) {
                  res.json({error: "Post not saved"})
                } else {
                  res.json({
                    success: true,
                    response: postObject
                  })
                }
              })
            }
          })
        }
      })
    }
  })
})

router.post('/api/users/logout', function(req, res) {
  Token.findOneAndRemove({token: req.body.token}, function(err) {
    if(err) {
      res.json({error: "Couldn't find token"})
    } else {
      res.json({
        success: true,
        response: "Token removed!"
      })
    }
  })
})

module.exports = router;
