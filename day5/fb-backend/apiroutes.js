"use strict";

var express = require('express');
var router = express.Router();
var User = require('./models').User;
var Token = require('./models').Token;
var Post = require('./models').Post;


router.get('/', function(req, res){
  res.json({message: 'hello'});
})

router.post('/users/register', function(req, res){
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })
  console.log(req.body);
  newUser.save(function(err, user){
    if(err) {
      res.json({failure: 'did not save user'})
    } else {
      res.json({success: true})
    }
  });
});

router.post('/users/login', function(req, res){
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, function(err, user){
    if(err) {
      res.json({error: "Login failed."})
    } else {
      var newToken = new Token({
        userId: user._id,
        token: user.email + new Date(),
        createdAt: new Date(),
      })
      newToken.save(function(err, token){
        if(err) {
          res.json({failure: 'did not save token'})
        } else {
          res.json({
            success: true,
            response: {
              id: token.userId,
              token: token.token
            }
          })
        }
      })
    }
  })
})


router.get('/users/logout', function(req, res){
  Token.findOne({token: req.body.token}, function(err, token){
    if(err) {
      res.json({failure: 'did not find token.'});
    } else {
      Token.remove(token, function(err){
        if(err){
          res.json({failure: 'Logout failed.'})
        } else {
          res.json({success: true});
        }
      });
    }
  })
})

router.get('/posts', function(req, res){
  Token.findOne({token: req.body.token}, function(err, token){
    if(err) {
      res.json({failure: 'did not find token.'});
    } else {
    Post.find().limit(10).exec(function(err, posts){
      if (err) {
        res.json({error: "posts cannot be found"})
      } else {
          res.json({
            success: true,
            response: posts
          });
        }
      })
    }
  })
})

router.get('/posts/:page', function(req, res){
  var page = req.params.page-1
  Token.findOne({token: req.body.token}, function(err, token){
    if(err) {
      res.json({failure: 'did not find token.'});
    } else {
    Post.find().limit(10).skip(10*page).exec(function(err, posts){
      if (err) {
        res.json({error: "posts cannot be found"})
      } else {
          res.json({
            success: true,
            response: posts
          });
        }
      })
    }
  })
})

router.post('/posts', function(req, res) {
  // if(req.body.token && req.body.content){
    Token.findOne({token: req.body.token}, function(err, token){
      if(err) {
        res.json({failure: 'did not find token.'});
      } else {
        User.findById(token.userId, function(err, user){
          if(err){
            res.json({error: "this token doesn't correspond to a user"})
          }
          var newPost = new Post({
            poster: {
              name: user.fname + " " + user.lname,
              id: user._id
            },
            content: req.body.content,
            likes: [],
            comments: [],
            createdAt: new Date(),
          })
          newPost.save(function(err, post){
            if(err) {
              res.json({error: 'post did not save'})
            } else {
              res.json({success: true})
            }
          })
        })
      }
    })
  // } else {
  //   res.json({error: 'need valid token and content'});
  // }
})

router.get('/posts/comments/:postid', function(req, res){
  var postid = req.params.postid;
  Token.findOne({token: req.body.token}, function(err, token){
    if(err) {
      res.json({failure: 'did not find token.'});
    } else {
      Post.findById(postid, function(err, post){
        if(err){
          res.json({error: 'no post was found'});
        } else {
          res.json({
            success: true,
            response: post.comments
          })
        }
      })
    }
  })
})

router.post('/posts/comments/:postid', function(req, res){
  var postid = req.params.postid;
  Token.findOne({token: req.body.token}, function(err, token){
    console.log('AAAAAAAAAAAA', token);
    if(err) {
      res.json({failure: 'no token was found'});
    } else {
      Post.findById(postid, function(err, post){
        if(err) {
          res.json({error: 'no post was found'});
        } else {
          User.findById(token.userId, function(err, user){
            if(err) {
              res.json({error: "no user was found"})
            } else {
              post.comments.push({
                createdAt: new Date(),
                content: req.body.content,
                poster: {
                  name: user.fname + " " + user.lname,
                  id: user._id
                }
              })
              Post.findByIdAndUpdate(postid, post, function(err, oldPost){
                if(err){
                  res.json({error: "post didnt save, comments not saved"})
                } else {
                  res.json({
                    success: true,
                    response: post
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

router.get('posts/likes/:postid', function(req, res){
  var postid = req.params.postid;
  Token.findOne({token: req.body.token}, function(err, token){
    if(err) {
      res.json({failure: 'no token was found'});
    } else {
      Post.findById(postid, function(err, post){
        if(err) {
          res.json({error: 'no post was found'});
        } else {
          User.findById(token.userId, function(err, user){
            if(err) {
              res.json({error: "no user was found"})
            } else {
              // if(liked)
            }
          })
        }
      })
    }
  })
})


module.exports = router;
